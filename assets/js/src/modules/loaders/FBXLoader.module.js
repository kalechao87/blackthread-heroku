import * as THREE from 'three';
import NURBSCurve from './curves/NurbsCurve.js';

/**
 * @author Kyle-Larson https://github.com/Kyle-Larson
 * @author Takahiro https://github.com/takahirox
 *
 * Loader loads FBX file and generates Group representing FBX scene.
 * Requires FBX file to be >= 7.0 and in ASCII or to be any version in Binary format.
 *
 * Supports:
 * 	Mesh Generation (Positional Data)
 * 	Normal Data (Per Vertex Drawing Instance)
 *  UV Data (Per Vertex Drawing Instance)
 *  Skinning
 *  Animation
 * 	- Separated Animations based on stacks.
 * 	- Skeletal & Non-Skeletal Animations
 *  NURBS (Open, Closed and Periodic forms)
 *
 * Needs Support:
 * 	Indexed Buffers
 * 	PreRotation support.
 */



  /**
   * Generates a loader for loading FBX files from URL and parsing into
   * a THREE.Group.
   * @param {THREE.LoadingManager} manager - Loading Manager for loader to use.
   */

export default function FBXLoader ( manager ) {

  this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

Object.assign( FBXLoader.prototype, {

    /**
     * Loads an ASCII/Binary FBX file from URL and parses into a THREE.Group.
     * THREE.Group will have an animations property of AnimationClips
     * of the different animations exported with the FBX.
     * @param {string} url - URL of the FBX file.
     * @param {function(THREE.Group):void} onLoad - Callback for when FBX file is loaded and parsed.
     * @param {function(ProgressEvent):void} onProgress - Callback fired periodically when file is being retrieved from server.
     * @param {function(Event):void} onError - Callback fired when error occurs (Currently only with retrieving file, not with parsing errors).
     */
  load( url, onLoad, onProgress, onError ) {

    const self = this;

    const resourceDirectory = THREE.Loader.prototype.extractUrlBase( url );

    const loader = new THREE.FileLoader( this.manager );
    loader.setResponseType( 'arraybuffer' );
    loader.load( url, ( buffer ) => {

      try {

        const scene = self.parse( buffer, resourceDirectory );

        onLoad( scene );

      } catch ( error ) {

        window.setTimeout( () => {

            if ( onError ) onError( error );

            self.manager.itemError( url );

          }, 0 );

      }

    }, onProgress, onError );

  },

    /**
     * Parses an ASCII/Binary FBX file and returns a THREE.Group.
     * THREE.Group will have an animations property of AnimationClips
     * of the different animations within the FBX file.
     * @param {ArrayBuffer} FBXBuffer - Contents of FBX file to parse.
     * @param {string} resourceDirectory - Directory to load external assets (e.g. textures ) from.
     * @returns {THREE.Group}
     */
  parse( FBXBuffer, resourceDirectory ) {

    let FBXTree;

    if ( isFbxFormatBinary( FBXBuffer ) ) {

      FBXTree = new BinaryParser().parse( FBXBuffer );

    } else {

      const FBXText = convertArrayBufferToString( FBXBuffer );

      if ( !isFbxFormatASCII( FBXText ) ) {

        throw new Error( 'THREE.FBXLoader: Unknown format.' );

      }

      if ( getFbxVersion( FBXText ) < 7000 ) {

        throw new Error( 'THREE.FBXLoader: FBX version not supported, FileVersion: ' + getFbxVersion( FBXText ) );

      }

      FBXTree = new TextParser().parse( FBXText );

    }

      // console.log( FBXTree );

    const connections = parseConnections( FBXTree );
    const images = parseImages( FBXTree );
    const textures = parseTextures( FBXTree, new THREE.TextureLoader( this.manager ).setPath( resourceDirectory ), images, connections );
    const materials = parseMaterials( FBXTree, textures, connections );
    const deformers = parseDeformers( FBXTree, connections );
    const geometryMap = parseGeometries( FBXTree, connections, deformers );
    const sceneGraph = parseScene( FBXTree, connections, deformers, geometryMap, materials );

    return sceneGraph;

  },

} );

  /**
   * Parses map of relationships between objects.
   * @param {{Connections: { properties: { connections: [number, number, string][]}}}} FBXTree
   * @returns {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>}
   */
function parseConnections( FBXTree ) {

    /**
     * @type {Map<number, { parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>}
     */
  const connectionMap = new Map();

  if ( 'Connections' in FBXTree ) {

      /**
       * @type {[number, number, string][]}
       */
    const connectionArray = FBXTree.Connections.properties.connections;
    for ( let connectionArrayIndex = 0, connectionArrayLength = connectionArray.length; connectionArrayIndex < connectionArrayLength; ++connectionArrayIndex ) {

      const connection = connectionArray[ connectionArrayIndex ];

      if ( !connectionMap.has( connection[ 0 ] ) ) {

        connectionMap.set( connection[ 0 ], {
            parents: [],
            children: [],
          } );

      }

      const parentRelationship = { ID: connection[ 1 ], relationship: connection[ 2 ] };
      connectionMap.get( connection[ 0 ] ).parents.push( parentRelationship );

      if ( !connectionMap.has( connection[ 1 ] ) ) {

        connectionMap.set( connection[ 1 ], {
            parents: [],
            children: [],
          } );

      }

      const childRelationship = { ID: connection[ 0 ], relationship: connection[ 2 ] };
      connectionMap.get( connection[ 1 ] ).children.push( childRelationship );

    }

  }

  return connectionMap;

}

  /**
   * Parses map of images referenced in FBXTree.
   * @param {{Objects: {subNodes: {Texture: Object.<string, FBXTextureNode>}}}} FBXTree
   * @returns {Map<number, string(image blob/data URL)>}
   */
function parseImages( FBXTree ) {

    /**
     * @type {Map<number, string(image blob/data URL)>}
     */
  const imageMap = new Map();

  if ( 'Video' in FBXTree.Objects.subNodes ) {

    const videoNodes = FBXTree.Objects.subNodes.Video;

    for ( const nodeID in videoNodes ) {

      const videoNode = videoNodes[ nodeID ];

        // raw image data is in videoNode.properties.Content
      if ( 'Content' in videoNode.properties ) {

        const image = parseImage( videoNodes[ nodeID ] );
        imageMap.set( parseInt( nodeID ), image );

      }

    }

  }

  return imageMap;

}

  /**
   * @param {videoNode} videoNode - Node to get texture image information from.
   * @returns {string} - image blob/data URL
   */
function parseImage( videoNode ) {

  const content = videoNode.properties.Content;
  const fileName = videoNode.properties.RelativeFilename || videoNode.properties.Filename;
  const extension = fileName.slice( fileName.lastIndexOf( '.' ) + 1 ).toLowerCase();

  let type;

  switch ( extension ) {

    case 'bmp':

      type = 'image/bmp';
      break;

    case 'jpg':
    case 'jpeg':

      type = 'image/jpeg';
      break;

    case 'png':

      type = 'image/png';
      break;

    case 'tif':

      type = 'image/tiff';
      break;

    default:

      console.warn( 'FBXLoader: Image type "' + extension + '" is not supported.' );
      return;

  }

  if ( typeof content === 'string' ) {

    return 'data:' + type + ';base64,' + content;

  }

  const array = new Uint8Array( content );
  return window.URL.createObjectURL( new Blob( [ array ], { type } ) );


}

  /**
   * Parses map of textures referenced in FBXTree.
   * @param {{Objects: {subNodes: {Texture: Object.<string, FBXTextureNode>}}}} FBXTree
   * @param {THREE.TextureLoader} loader
   * @param {Map<number, string(image blob/data URL)>} imageMap
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @returns {Map<number, THREE.Texture>}
   */
function parseTextures( FBXTree, loader, imageMap, connections ) {

    /**
     * @type {Map<number, THREE.Texture>}
     */
  const textureMap = new Map();

  if ( 'Texture' in FBXTree.Objects.subNodes ) {

    const textureNodes = FBXTree.Objects.subNodes.Texture;
    for ( const nodeID in textureNodes ) {

      const texture = parseTexture( textureNodes[ nodeID ], loader, imageMap, connections );
      textureMap.set( parseInt( nodeID ), texture );

    }

  }

  return textureMap;

}

  /**
   * @param {textureNode} textureNode - Node to get texture information from.
   * @param {THREE.TextureLoader} loader
   * @param {Map<number, string(image blob/data URL)>} imageMap
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @returns {THREE.Texture}
   */
function parseTexture( textureNode, loader, imageMap, connections ) {

  const FBX_ID = textureNode.id;

  const name = textureNode.attrName;

  let fileName;

  const filePath = textureNode.properties.FileName;
  const relativeFilePath = textureNode.properties.RelativeFilename;

  const children = connections.get( FBX_ID ).children;

  if ( children !== undefined && children.length > 0 && imageMap.has( children[ 0 ].ID ) ) {

    fileName = imageMap.get( children[ 0 ].ID );

  } else if ( relativeFilePath !== undefined && relativeFilePath[ 0 ] !== '/' &&
        relativeFilePath.match( /^[a-zA-Z]:/ ) === null ) {

      // use textureNode.properties.RelativeFilename
      // if it exists and it doesn't seem an absolute path

    fileName = relativeFilePath;

  } else {

    const split = filePath.split( /[\\\/]/ );

    if ( split.length > 0 ) {

      fileName = split[ split.length - 1 ];

    } else {

      fileName = filePath;

    }

  }

  const currentPath = loader.path;

  if ( fileName.indexOf( 'blob:' ) === 0 || fileName.indexOf( 'data:' ) === 0 ) {

    loader.setPath( undefined );

  }

    /**
     * @type {THREE.Texture}
     */
  const texture = loader.load( fileName );
  texture.name = name;
  texture.FBX_ID = FBX_ID;

  const wrapModeU = textureNode.properties.WrapModeU;
  const wrapModeV = textureNode.properties.WrapModeV;

  const valueU = wrapModeU !== undefined ? wrapModeU.value : 0;
  const valueV = wrapModeV !== undefined ? wrapModeV.value : 0;

    // http://download.autodesk.com/us/fbx/SDKdocs/FBX_SDK_Help/files/fbxsdkref/class_k_fbx_texture.html#889640e63e2e681259ea81061b85143a
    // 0: repeat(default), 1: clamp

  texture.wrapS = valueU === 0 ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.wrapT = valueV === 0 ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;

  if ( 'Scaling' in textureNode.properties ) {

    const values = textureNode.properties.Scaling.value;

    texture.repeat.x = values[ 0 ];
    texture.repeat.y = values[ 1 ];

  }

  loader.setPath( currentPath );

  return texture;

}

  /**
   * Parses map of Material information.
   * @param {{Objects: {subNodes: {Material: Object.<number, FBXMaterialNode>}}}} FBXTree
   * @param {Map<number, THREE.Texture>} textureMap
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @returns {Map<number, THREE.Material>}
   */
function parseMaterials( FBXTree, textureMap, connections ) {

  const materialMap = new Map();

  if ( 'Material' in FBXTree.Objects.subNodes ) {

    const materialNodes = FBXTree.Objects.subNodes.Material;
    for ( const nodeID in materialNodes ) {

      const material = parseMaterial( materialNodes[ nodeID ], textureMap, connections );
      if ( material !== null ) materialMap.set( parseInt( nodeID ), material );

    }

  }

  return materialMap;

}

  /**
   * Takes information from Material node and returns a generated THREE.Material
   * @param {FBXMaterialNode} materialNode
   * @param {Map<number, THREE.Texture>} textureMap
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @returns {THREE.Material}
   */
function parseMaterial( materialNode, textureMap, connections ) {

  const FBX_ID = materialNode.id;
  const name = materialNode.attrName;
  let type = materialNode.properties.ShadingModel;

    // Case where FBX wraps shading model in property object.
  if ( typeof type === 'object' ) {

    type = type.value;

  }

    // Seems like FBX can include unused materials which don't have any connections.
    // Ignores them so far.
  if ( !connections.has( FBX_ID ) ) return null;

  const children = connections.get( FBX_ID ).children;

  const parameters = parseParameters( materialNode.properties, textureMap, children );

  let material;

  switch ( type.toLowerCase() ) {

    case 'phong':
      material = new THREE.MeshPhongMaterial();
      break;
    case 'lambert':
      material = new THREE.MeshLambertMaterial();
      break;
    default:
      console.warn( 'THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', type );
      material = new THREE.MeshPhongMaterial( { color: 0x3300ff } );
      break;

  }

  material.setValues( parameters );
  material.name = name;

  return material;

}

  /**
   * @typedef {{Diffuse: FBXVector3, Specular: FBXVector3, Shininess: FBXValue, Emissive: FBXVector3, EmissiveFactor: FBXValue, Opacity: FBXValue}} FBXMaterialProperties
   */
  /**
   * @typedef {{color: THREE.Color=, specular: THREE.Color=, shininess: number=, emissive: THREE.Color=, emissiveIntensity: number=, opacity: number=, transparent: boolean=, map: THREE.Texture=}} THREEMaterialParameterPack
   */
  /**
   * @param {FBXMaterialProperties} properties
   * @param {Map<number, THREE.Texture>} textureMap
   * @param {{ID: number, relationship: string}[]} childrenRelationships
   * @returns {THREEMaterialParameterPack}
   */
function parseParameters( properties, textureMap, childrenRelationships ) {

  const parameters = {};

  if ( properties.BumpFactor ) {

    parameters.bumpScale = properties.BumpFactor.value;

  }
  if ( properties.Diffuse ) {

    parameters.color = parseColor( properties.Diffuse );

  }
  if ( properties.DisplacementFactor ) {

    parameters.displacementScale = properties.DisplacementFactor.value;

  }
  if ( properties.ReflectionFactor ) {

    parameters.reflectivity = properties.ReflectionFactor.value;

  }
  if ( properties.Specular ) {

    parameters.specular = parseColor( properties.Specular );

  }
  if ( properties.Shininess ) {

    parameters.shininess = properties.Shininess.value;

  }
  if ( properties.Emissive ) {

    parameters.emissive = parseColor( properties.Emissive );

  }
  if ( properties.EmissiveFactor ) {

    parameters.emissiveIntensity = parseFloat( properties.EmissiveFactor.value );

  }
  if ( properties.Opacity ) {

    parameters.opacity = parseFloat( properties.Opacity.value );

  }
  if ( parameters.opacity < 1.0 ) {

    parameters.transparent = true;

  }

  for ( let childrenRelationshipsIndex = 0, childrenRelationshipsLength = childrenRelationships.length; childrenRelationshipsIndex < childrenRelationshipsLength; ++childrenRelationshipsIndex ) {

    const relationship = childrenRelationships[ childrenRelationshipsIndex ];

    const type = relationship.relationship;

    switch ( type ) {

      case 'Bump':
        parameters.bumpMap = textureMap.get( relationship.ID );
        break;

      case 'DiffuseColor':
        parameters.map = textureMap.get( relationship.ID );
        break;

      case 'DisplacementColor':
        parameters.displacementMap = textureMap.get( relationship.ID );
        break;


      case 'EmissiveColor':
        parameters.emissiveMap = textureMap.get( relationship.ID );
        break;

      case 'NormalMap':
        parameters.normalMap = textureMap.get( relationship.ID );
        break;

      case 'ReflectionColor':
        parameters.envMap = textureMap.get( relationship.ID );
        parameters.envMap.mapping = THREE.EquirectangularReflectionMapping;
        break;

      case 'SpecularColor':
        parameters.specularMap = textureMap.get( relationship.ID );
        break;

      case 'TransparentColor':
        parameters.alphaMap = textureMap.get( relationship.ID );
        parameters.transparent = true;
        break;

      case 'AmbientColor':
      case 'ShininessExponent': // AKA glossiness map
      case 'SpecularFactor': // AKA specularLevel
      case 'VectorDisplacementColor': // NOTE: Seems to be a copy of DisplacementColor
      default:
        console.warn( 'THREE.FBXLoader: %s map is not supported in three.js, skipping texture.', type );
        break;

    }

  }

  return parameters;

}

  /**
   * Generates map of Skeleton-like objects for use later when generating and binding skeletons.
   * @param {{Objects: {subNodes: {Deformer: Object.<number, FBXSubDeformerNode>}}}} FBXTree
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @returns {Map<number, {map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[], skeleton: THREE.Skeleton|null}>}
   */
function parseDeformers( FBXTree, connections ) {

  const deformers = {};

  if ( 'Deformer' in FBXTree.Objects.subNodes ) {

    const DeformerNodes = FBXTree.Objects.subNodes.Deformer;

    for ( const nodeID in DeformerNodes ) {

      const deformerNode = DeformerNodes[ nodeID ];

      if ( deformerNode.attrType === 'Skin' ) {

        const conns = connections.get( parseInt( nodeID ) );
        const skeleton = parseSkeleton( conns, DeformerNodes );
        skeleton.FBX_ID = parseInt( nodeID );

        deformers[ nodeID ] = skeleton;

      }

    }

  }

  return deformers;

}

  /**
   * Generates a "Skeleton Representation" of FBX nodes based on an FBX Skin Deformer's connections and an object containing SubDeformer nodes.
   * @param {{parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}} connections
   * @param {Object.<number, FBXSubDeformerNode>} DeformerNodes
   * @returns {{map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[], skeleton: THREE.Skeleton|null}}
   */
function parseSkeleton( connections, DeformerNodes ) {

  const subDeformers = {};
  const children = connections.children;

  for ( let i = 0, l = children.length; i < l; ++i ) {

    const child = children[ i ];

    const subDeformerNode = DeformerNodes[ child.ID ];

    const subDeformer = {
      FBX_ID: child.ID,
      index: i,
      indices: [],
      weights: [],
      transform: subDeformerNode.subNodes.Transform.properties.a,
      transformLink: subDeformerNode.subNodes.TransformLink.properties.a,
      linkMode: subDeformerNode.properties.Mode,
    };

    if ( 'Indexes' in subDeformerNode.subNodes ) {

      subDeformer.indices = parseNumberArray( subDeformerNode.subNodes.Indexes.properties.a );
      subDeformer.weights = parseNumberArray( subDeformerNode.subNodes.Weights.properties.a );

    }

    subDeformers[ child.ID ] = subDeformer;

  }

  return {
    map: subDeformers,
    bones: [],
  };

}

  /**
   * Generates Buffer geometries from geometry information in FBXTree, and generates map of THREE.BufferGeometries
   * @param {{Objects: {subNodes: {Geometry: Object.<number, FBXGeometryNode}}}} FBXTree
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @param {Map<number, {map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[], skeleton: THREE.Skeleton|null}>} deformers
   * @returns {Map<number, THREE.BufferGeometry>}
   */
function parseGeometries( FBXTree, connections, deformers ) {

  const geometryMap = new Map();

  if ( 'Geometry' in FBXTree.Objects.subNodes ) {

    const geometryNodes = FBXTree.Objects.subNodes.Geometry;

    for ( const nodeID in geometryNodes ) {

      const relationships = connections.get( parseInt( nodeID ) );
      const geo = parseGeometry( geometryNodes[ nodeID ], relationships, deformers );
      geometryMap.set( parseInt( nodeID ), geo );

    }

  }

  return geometryMap;

}

  /**
   * Generates BufferGeometry from FBXGeometryNode.
   * @param {FBXGeometryNode} geometryNode
   * @param {{parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}} relationships
   * @param {Map<number, {map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[]}>} deformers
   * @returns {THREE.BufferGeometry}
   */
function parseGeometry( geometryNode, relationships, deformers ) {

  switch ( geometryNode.attrType ) {

    case 'Mesh':
      return parseMeshGeometry( geometryNode, relationships, deformers );
      break;

    case 'NurbsCurve':
      return parseNurbsGeometry( geometryNode );
      break;

  }

}

  /**
   * Specialty function for parsing Mesh based Geometry Nodes.
   * @param {FBXGeometryNode} geometryNode
   * @param {{parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}} relationships - Object representing relationships between specific geometry node and other nodes.
   * @param {Map<number, {map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[]}>} deformers - Map object of deformers and subDeformers by ID.
   * @returns {THREE.BufferGeometry}
   */
function parseMeshGeometry( geometryNode, relationships, deformers ) {

  for ( let i = 0; i < relationships.children.length; ++i ) {

    var deformer = deformers[ relationships.children[ i ].ID ];
    if ( deformer !== undefined ) break;

  }

  return genGeometry( geometryNode, deformer );

}

  /**
   * @param {{map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[]}} deformer - Skeleton representation for geometry instance.
   * @returns {THREE.BufferGeometry}
   */
function genGeometry( geometryNode, deformer ) {

  const geometry = new Geometry();

  const subNodes = geometryNode.subNodes;

    // First, each index is going to be its own vertex.

  const vertexBuffer = parseNumberArray( subNodes.Vertices.properties.a );
  const indexBuffer = parseNumberArray( subNodes.PolygonVertexIndex.properties.a );

  if ( subNodes.LayerElementNormal ) {

    var normalInfo = getNormals( subNodes.LayerElementNormal[ 0 ] );

  }

  if ( subNodes.LayerElementUV ) {

    var uvInfo = [];
    var i = 0;
    while ( subNodes.LayerElementUV[ i ] ) {

      uvInfo.push( getUVs( subNodes.LayerElementUV[ i ] ) );
      i++;

    }

  }

  if ( subNodes.LayerElementColor ) {

    var colorInfo = getColors( subNodes.LayerElementColor[ 0 ] );

  }

  if ( subNodes.LayerElementMaterial ) {

    var materialInfo = getMaterials( subNodes.LayerElementMaterial[ 0 ] );

  }

  const weightTable = {};

  if ( deformer ) {

    const subDeformers = deformer.map;

    for ( const key in subDeformers ) {

      const subDeformer = subDeformers[ key ];
      const indices = subDeformer.indices;

      for ( var j = 0; j < indices.length; j++ ) {

        const index = indices[ j ];
        const weight = subDeformer.weights[ j ];

        if ( weightTable[ index ] === undefined ) weightTable[ index ] = [];

        weightTable[ index ].push( {
            id: subDeformer.index,
            weight,
          } );

      }

    }

  }

  let faceVertexBuffer = [];
  let polygonIndex = 0;
  let displayedWeightsWarning = false;

  for ( let polygonVertexIndex = 0; polygonVertexIndex < indexBuffer.length; polygonVertexIndex++ ) {

    let vertexIndex = indexBuffer[ polygonVertexIndex ];

    let endOfFace = false;

    if ( vertexIndex < 0 ) {

      vertexIndex ^= -1;
      indexBuffer[ polygonVertexIndex ] = vertexIndex;
      endOfFace = true;

    }

    const vertex = new Vertex();
    var weightIndices = [];
    let weights = [];

    vertex.position.fromArray( vertexBuffer, vertexIndex * 3 );

    if ( deformer ) {

      if ( weightTable[ vertexIndex ] !== undefined ) {

        const array = weightTable[ vertexIndex ];

        for ( var j = 0, jl = array.length; j < jl; j++ ) {

            weights.push( array[ j ].weight );
            weightIndices.push( array[ j ].id );

          }

      }

      if ( weights.length > 4 ) {

        if ( !displayedWeightsWarning ) {

            console.warn( 'THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.' );
            displayedWeightsWarning = true;

          }

        var WIndex = [ 0, 0, 0, 0 ];
        var Weight = [ 0, 0, 0, 0 ];

        weights.forEach( ( weight, weightIndex ) => {

            let currentWeight = weight;
            let currentIndex = weightIndices[ weightIndex ];

            Weight.forEach( ( comparedWeight, comparedWeightIndex, comparedWeightArray ) => {

              if ( currentWeight > comparedWeight ) {

                comparedWeightArray[ comparedWeightIndex ] = currentWeight;
                currentWeight = comparedWeight;

                const tmp = WIndex[ comparedWeightIndex ];
                WIndex[ comparedWeightIndex ] = currentIndex;
                currentIndex = tmp;

              }

            } );

          } );

        weightIndices = WIndex;
        weights = Weight;

      }

      for ( var i = weights.length; i < 4; ++i ) {

        weights[ i ] = 0;
        weightIndices[ i ] = 0;

      }

      vertex.skinWeights.fromArray( weights );
      vertex.skinIndices.fromArray( weightIndices );

    }

    if ( normalInfo ) {

      vertex.normal.fromArray( getData( polygonVertexIndex, polygonIndex, vertexIndex, normalInfo ) );

    }

    if ( uvInfo ) {

      for ( var i = 0; i < uvInfo.length; i++ ) {

        const uvTemp = new THREE.Vector2();
        vertex.uv.push( uvTemp.fromArray( getData( polygonVertexIndex, polygonIndex, vertexIndex, uvInfo[ i ] ) ) );

      }

    }

    if ( colorInfo ) {

      vertex.color.fromArray( getData( polygonVertexIndex, polygonIndex, vertexIndex, colorInfo ) );

    }

    faceVertexBuffer.push( vertex );

    if ( endOfFace ) {

      const face = new Face();
      face.genTrianglesFromVertices( faceVertexBuffer );

      if ( materialInfo !== undefined ) {

        const materials = getData( polygonVertexIndex, polygonIndex, vertexIndex, materialInfo );
        face.materialIndex = materials[ 0 ];

      } else {

          // Seems like some models don't have materialInfo(subNodes.LayerElementMaterial).
          // Set 0 in such a case.
        face.materialIndex = 0;

      }

      geometry.faces.push( face );
      faceVertexBuffer = [];
      polygonIndex++;

      endOfFace = false;

    }

  }

    /**
     * @type {{vertexBuffer: number[], normalBuffer: number[], uvBuffer: number[], skinIndexBuffer: number[], skinWeightBuffer: number[], materialIndexBuffer: number[]}}
     */
  const bufferInfo = geometry.flattenToBuffers();

  const geo = new THREE.BufferGeometry();
  geo.name = geometryNode.name;
  geo.addAttribute( 'position', new THREE.Float32BufferAttribute( bufferInfo.vertexBuffer, 3 ) );

  if ( bufferInfo.normalBuffer.length > 0 ) {

    geo.addAttribute( 'normal', new THREE.Float32BufferAttribute( bufferInfo.normalBuffer, 3 ) );

  }
  if ( bufferInfo.uvBuffers.length > 0 ) {

    for ( var i = 0; i < bufferInfo.uvBuffers.length; i++ ) {

      let name = 'uv' + ( i + 1 ).toString();
      if ( i == 0 ) {

        name = 'uv';

      }

      geo.addAttribute( name, new THREE.Float32BufferAttribute( bufferInfo.uvBuffers[ i ], 2 ) );

    }

  }

  if ( subNodes.LayerElementColor ) {

    geo.addAttribute( 'color', new THREE.Float32BufferAttribute( bufferInfo.colorBuffer, 3 ) );

  }

  if ( deformer ) {

    geo.addAttribute( 'skinIndex', new THREE.Float32BufferAttribute( bufferInfo.skinIndexBuffer, 4 ) );

    geo.addAttribute( 'skinWeight', new THREE.Float32BufferAttribute( bufferInfo.skinWeightBuffer, 4 ) );

    geo.FBX_Deformer = deformer;

  }

  if ( materialInfo.mappingType !== 'AllSame' ) {

      // Convert the material indices of each vertex into rendering groups on the geometry.
    const materialIndexBuffer = bufferInfo.materialIndexBuffer;
    let prevMaterialIndex = materialIndexBuffer[ 0 ];
    let startIndex = 0;

    for ( var i = 0; i < materialIndexBuffer.length; ++i ) {

      if ( materialIndexBuffer[ i ] !== prevMaterialIndex ) {

        geo.addGroup( startIndex, i - startIndex, prevMaterialIndex );

        prevMaterialIndex = materialIndexBuffer[ i ];
        startIndex = i;

      }

    }

      // the loop above doesn't add the last group, do that here.
    if ( geo.groups.length > 0 ) {

      const lastGroup = geo.groups[ geo.groups.length - 1 ];
      const lastIndex = lastGroup.start + lastGroup.count;

      if ( lastIndex !== materialIndexBuffer.length ) {

        geo.addGroup( lastIndex, materialIndexBuffer.length - lastIndex, prevMaterialIndex );

      }

    }

      // case where there are multiple materials but the whole geometry is only
      // using one of them
    if ( geo.groups.length === 0 ) {

      geo.addGroup( 0, materialIndexBuffer.length, materialIndexBuffer[ 0 ] );

    }

  }

  return geo;

}

  /**
   * Parses normal information for geometry.
   * @param {FBXGeometryNode} geometryNode
   * @returns {{dataSize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}}
   */
function getNormals( NormalNode ) {

  const mappingType = NormalNode.properties.MappingInformationType;
  const referenceType = NormalNode.properties.ReferenceInformationType;
  const buffer = parseNumberArray( NormalNode.subNodes.Normals.properties.a );
  let indexBuffer = [];
  if ( referenceType === 'IndexToDirect' ) {

    if ( 'NormalIndex' in NormalNode.subNodes ) {

      indexBuffer = parseNumberArray( NormalNode.subNodes.NormalIndex.properties.a );

    } else if ( 'NormalsIndex' in NormalNode.subNodes ) {

      indexBuffer = NormalNode.subNodes.NormalsIndex.properties.a;

    }

  }

  return {
    dataSize: 3,
    buffer,
    indices: indexBuffer,
    mappingType,
    referenceType,
  };

}

  /**
   * Parses UV information for geometry.
   * @param {FBXGeometryNode} geometryNode
   * @returns {{dataSize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}}
   */
function getUVs( UVNode ) {

  const mappingType = UVNode.properties.MappingInformationType;
  const referenceType = UVNode.properties.ReferenceInformationType;
  const buffer = parseNumberArray( UVNode.subNodes.UV.properties.a );
  let indexBuffer = [];
  if ( referenceType === 'IndexToDirect' ) {

    indexBuffer = parseNumberArray( UVNode.subNodes.UVIndex.properties.a );

  }

  return {
    dataSize: 2,
    buffer,
    indices: indexBuffer,
    mappingType,
    referenceType,
  };

}

  /**
   * Parses Vertex Color information for geometry.
   * @param {FBXGeometryNode} geometryNode
   * @returns {{dataSize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}}
   */
function getColors( ColorNode ) {

  const mappingType = ColorNode.properties.MappingInformationType;
  const referenceType = ColorNode.properties.ReferenceInformationType;
  const buffer = ColorNode.subNodes.Colors.properties.a;
  let indexBuffer = [];
  if ( referenceType === 'IndexToDirect' ) {

    indexBuffer = ColorNode.subNodes.ColorIndex.properties.a;

  }

  return {
    dataSize: 4,
    buffer,
    indices: indexBuffer,
    mappingType,
    referenceType,
  };

}

  /**
   * Parses material application information for geometry.
   * @param {FBXGeometryNode}
   * @returns {{dataSize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}}
   */
function getMaterials( MaterialNode ) {

  const mappingType = MaterialNode.properties.MappingInformationType;
  const referenceType = MaterialNode.properties.ReferenceInformationType;

  if ( mappingType === 'NoMappingInformation' ) {

    return {
      dataSize: 1,
      buffer: [ 0 ],
      indices: [ 0 ],
      mappingType: 'AllSame',
      referenceType,
    };

  }

  const materialIndexBuffer = parseNumberArray( MaterialNode.subNodes.Materials.properties.a );

    // Since materials are stored as indices, there's a bit of a mismatch between FBX and what
    // we expect.  So we create an intermediate buffer that points to the index in the buffer,
    // for conforming with the other functions we've written for other data.
  const materialIndices = [];

  for ( let materialIndexBufferIndex = 0, materialIndexBufferLength = materialIndexBuffer.length; materialIndexBufferIndex < materialIndexBufferLength; ++materialIndexBufferIndex ) {

    materialIndices.push( materialIndexBufferIndex );

  }

  return {
    dataSize: 1,
    buffer: materialIndexBuffer,
    indices: materialIndices,
    mappingType,
    referenceType,
  };

}

  /**
   * Function uses the infoObject and given indices to return value array of object.
   * @param {number} polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
   * @param {number} polygonIndex - Index of polygon in geometry.
   * @param {number} vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
   * @param {{datasize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}} infoObject - Object containing data and how to access data.
   * @returns {number[]}
   */

const dataArray = [];

const GetData = {

  ByPolygonVertex: {

      /**
       * Function uses the infoObject and given indices to return value array of object.
       * @param {number} polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
       * @param {number} polygonIndex - Index of polygon in geometry.
       * @param {number} vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
       * @param {{datasize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}} infoObject - Object containing data and how to access data.
       * @returns {number[]}
       */
    Direct( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

      const from = ( polygonVertexIndex * infoObject.dataSize );
      const to = ( polygonVertexIndex * infoObject.dataSize ) + infoObject.dataSize;

        // return infoObject.buffer.slice( from, to );
      return slice( dataArray, infoObject.buffer, from, to );

    },

      /**
       * Function uses the infoObject and given indices to return value array of object.
       * @param {number} polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
       * @param {number} polygonIndex - Index of polygon in geometry.
       * @param {number} vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
       * @param {{datasize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}} infoObject - Object containing data and how to access data.
       * @returns {number[]}
       */
    IndexToDirect( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

      const index = infoObject.indices[ polygonVertexIndex ];
      const from = ( index * infoObject.dataSize );
      const to = ( index * infoObject.dataSize ) + infoObject.dataSize;

        // return infoObject.buffer.slice( from, to );
      return slice( dataArray, infoObject.buffer, from, to );

    },

  },

  ByPolygon: {

      /**
       * Function uses the infoObject and given indices to return value array of object.
       * @param {number} polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
       * @param {number} polygonIndex - Index of polygon in geometry.
       * @param {number} vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
       * @param {{datasize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}} infoObject - Object containing data and how to access data.
       * @returns {number[]}
       */
    Direct( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

      const from = polygonIndex * infoObject.dataSize;
      const to = polygonIndex * infoObject.dataSize + infoObject.dataSize;

        // return infoObject.buffer.slice( from, to );
      return slice( dataArray, infoObject.buffer, from, to );

    },

      /**
       * Function uses the infoObject and given indices to return value array of object.
       * @param {number} polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
       * @param {number} polygonIndex - Index of polygon in geometry.
       * @param {number} vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
       * @param {{datasize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}} infoObject - Object containing data and how to access data.
       * @returns {number[]}
       */
    IndexToDirect( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

      const index = infoObject.indices[ polygonIndex ];
      const from = index * infoObject.dataSize;
      const to = index * infoObject.dataSize + infoObject.dataSize;

        // return infoObject.buffer.slice( from, to );
      return slice( dataArray, infoObject.buffer, from, to );

    },

  },

  ByVertice: {

    Direct( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

      const from = ( vertexIndex * infoObject.dataSize );
      const to = ( vertexIndex * infoObject.dataSize ) + infoObject.dataSize;

        // return infoObject.buffer.slice( from, to );
      return slice( dataArray, infoObject.buffer, from, to );

    },

  },

  AllSame: {

      /**
       * Function uses the infoObject and given indices to return value array of object.
       * @param {number} polygonVertexIndex - Index of vertex in draw order (which index of the index buffer refers to this vertex).
       * @param {number} polygonIndex - Index of polygon in geometry.
       * @param {number} vertexIndex - Index of vertex inside vertex buffer (used because some data refers to old index buffer that we don't use anymore).
       * @param {{datasize: number, buffer: number[], indices: number[], mappingType: string, referenceType: string}} infoObject - Object containing data and how to access data.
       * @returns {number[]}
       */
    IndexToDirect( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

      const from = infoObject.indices[ 0 ] * infoObject.dataSize;
      const to = infoObject.indices[ 0 ] * infoObject.dataSize + infoObject.dataSize;

        // return infoObject.buffer.slice( from, to );
      return slice( dataArray, infoObject.buffer, from, to );

    },

  },

};

function getData( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

  return GetData[ infoObject.mappingType ][ infoObject.referenceType ]( polygonVertexIndex, polygonIndex, vertexIndex, infoObject );

}

  /**
   * Specialty function for parsing NurbsCurve based Geometry Nodes.
   * @param {FBXGeometryNode} geometryNode
   * @param {{parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}} relationships
   * @returns {THREE.BufferGeometry}
   */
function parseNurbsGeometry( geometryNode ) {

  if ( NURBSCurve === undefined ) {

    console.error( 'THREE.FBXLoader: The loader relies on THREE.NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry.' );
    return new THREE.BufferGeometry();

  }

  const order = parseInt( geometryNode.properties.Order );

  if ( isNaN( order ) ) {

    console.error( 'THREE.FBXLoader: Invalid Order %s given for geometry ID: %s', geometryNode.properties.Order, geometryNode.id );
    return new THREE.BufferGeometry();

  }

  const degree = order - 1;

  const knots = geometryNode.subNodes.KnotVector.properties.a;
  const controlPoints = [];
  const pointsValues = geometryNode.subNodes.Points.properties.a;

  for ( var i = 0, l = pointsValues.length; i < l; i += 4 ) {

    controlPoints.push( new THREE.Vector4().fromArray( pointsValues, i ) );

  }

  let startKnot, endKnot;

  if ( geometryNode.properties.Form === 'Closed' ) {

    controlPoints.push( controlPoints[ 0 ] );

  } else if ( geometryNode.properties.Form === 'Periodic' ) {

    startKnot = degree;
    endKnot = knots.length - 1 - startKnot;

    for ( var i = 0; i < degree; ++i ) {

      controlPoints.push( controlPoints[ i ] );

    }

  }

  const curve = new NURBSCurve( degree, knots, controlPoints, startKnot, endKnot );
  const vertices = curve.getPoints( controlPoints.length * 7 );

  const positions = new Float32Array( vertices.length * 3 );

  for ( var i = 0, l = vertices.length; i < l; ++i ) {

    vertices[ i ].toArray( positions, i * 3 );

  }

  const geometry = new THREE.BufferGeometry();
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

  return geometry;

}

  /**
   * Finally generates Scene graph and Scene graph Objects.
   * @param {{Objects: {subNodes: {Model: Object.<number, FBXModelNode>}}}} FBXTree
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @param {Map<number, {map: Map<number, {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}>, array: {FBX_ID: number, indices: number[], weights: number[], transform: number[], transformLink: number[], linkMode: string}[], skeleton: THREE.Skeleton|null}>} deformers
   * @param {Map<number, THREE.BufferGeometry>} geometryMap
   * @param {Map<number, THREE.Material>} materialMap
   * @returns {THREE.Group}
   */
function parseScene( FBXTree, connections, deformers, geometryMap, materialMap ) {

  const sceneGraph = new THREE.Group();

  const ModelNode = FBXTree.Objects.subNodes.Model;

    /**
     * @type {Array.<THREE.Object3D>}
     */
  const modelArray = [];

    /**
     * @type {Map.<number, THREE.Object3D>}
     */
  const modelMap = new Map();

  for ( var nodeID in ModelNode ) {

    const id = parseInt( nodeID );
    var node = ModelNode[ nodeID ];
    var conns = connections.get( id );
    var model = null;

    for ( var i = 0; i < conns.parents.length; ++i ) {

      for ( var FBX_ID in deformers ) {

        var deformer = deformers[ FBX_ID ];
        var subDeformers = deformer.map;
        var subDeformer = subDeformers[ conns.parents[ i ].ID ];

        if ( subDeformer ) {

            const model2 = model;
            model = new THREE.Bone();
            deformer.bones[ subDeformer.index ] = model;

            // seems like we need this not to make non-connected bone, maybe?
            // TODO: confirm
            if ( model2 !== null ) model.add( model2 );

          }

      }

    }

    if ( !model ) {

      switch ( node.attrType ) {

        case 'Camera':
            /* ***********
            * Supported camera types:
            * PerspectiveCamera
            * OrthographicCamera
            ************** */
          var cameraAttribute;

          for ( var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex ) {

              var childID = conns.children[ childrenIndex ].ID;

              var attr = FBXTree.Objects.subNodes.NodeAttribute[ childID ];

              if ( attr !== undefined && attr.properties !== undefined ) {

                cameraAttribute = attr.properties;

              }

            }

          if ( cameraAttribute === undefined ) {

              model = new THREE.Object3D();

            } else {

              var type = 0;
              if ( cameraAttribute.CameraProjectionType !== undefined && cameraAttribute.CameraProjectionType.value === 1 ) {

                type = 1;

              }

              let nearClippingPlane = 1;
              if ( cameraAttribute.NearPlane !== undefined ) {

                nearClippingPlane = cameraAttribute.NearPlane.value / 1000;

              }

              let farClippingPlane = 1000;
              if ( cameraAttribute.FarPlane !== undefined ) {

                farClippingPlane = cameraAttribute.FarPlane.value / 1000;

              }


              let width = window.innerWidth;
              let height = window.innerHeight;

              if ( cameraAttribute.AspectWidth !== undefined && cameraAttribute.AspectHeight !== undefined ) {

                width = cameraAttribute.AspectWidth.value;
                height = cameraAttribute.AspectHeight.value;

              }

              const aspect = width / height;

              let fov = 45;
              if ( cameraAttribute.FieldOfView !== undefined ) {

                fov = cameraAttribute.FieldOfView.value;

              }

              switch ( type ) {

                case 0: // Perspective
                  model = new THREE.PerspectiveCamera( fov, aspect, nearClippingPlane, farClippingPlane );
                  break;

                case 1: // Orthographic
                  model = new THREE.OrthographicCamera( -width / 2, width / 2, height / 2, -height / 2, nearClippingPlane, farClippingPlane );
                  break;

                default:
                  console.warn( 'THREE.FBXLoader: Unknown camera type ' + type + '.' );
                  model = new THREE.Object3D();
                  break;

              }

            }

          break;

        case 'Light':
            /* ***********
            * Supported light types:
            * DirectionalLight
            * PointLight
            * SpotLight
            ************** */

          var lightAttribute;

          for ( var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex ) {

              var childID = conns.children[ childrenIndex ].ID;

              var attr = FBXTree.Objects.subNodes.NodeAttribute[ childID ];

              if ( attr !== undefined && attr.properties !== undefined ) {

                lightAttribute = attr.properties;

              }

            }

          if ( lightAttribute === undefined ) {

              model = new THREE.Object3D();

            } else {

              var type;

              // LightType can be undefined for Point lights
              if ( lightAttribute.LightType === undefined ) {

                type = 0;

              } else {

                type = lightAttribute.LightType.value;

              }

              var color = 0xffffff;

              if ( lightAttribute.Color !== undefined ) {

                color = parseColor( lightAttribute.Color.value );

              }

              let intensity = ( lightAttribute.Intensity === undefined ) ? 1 : lightAttribute.Intensity.value / 100;

              // light disabled
              if ( lightAttribute.CastLightOnObject !== undefined && lightAttribute.CastLightOnObject.value === 0 ) {

                intensity = 0;

              }

              let distance = 0;
              if ( lightAttribute.FarAttenuationEnd !== undefined ) {

                if ( lightAttribute.EnableFarAttenuation !== undefined && lightAttribute.EnableFarAttenuation.value === 0 ) {

                  distance = 0;

                } else {

                  distance = lightAttribute.FarAttenuationEnd.value / 1000;

                }

              }

              // TODO
              // could be calculated linearly from FarAttenuationStart to FarAttenuationEnd?
              const decay = 1;

              switch ( type ) {

                case 0: // Point
                  model = new THREE.PointLight( color, intensity, distance, decay );
                  break;

                case 1: // Directional
                  model = new THREE.DirectionalLight( color, intensity );
                  break;

                case 2: // Spot
                  var angle = Math.PI / 3;

                  if ( lightAttribute.InnerAngle !== undefined ) {

                    angle = THREE.Math.degToRad( lightAttribute.InnerAngle.value );

                  }

                  var penumbra = 0;
                  if ( lightAttribute.OuterAngle !== undefined ) {

                    // TODO: this is not correct - FBX calculates outer and inner angle in degrees
                    // with OuterAngle > InnerAngle && OuterAngle <= Math.PI
                    // while three.js uses a penumbra between (0, 1) to attenuate the inner angle
                    penumbra = THREE.Math.degToRad( lightAttribute.OuterAngle.value );
                    penumbra = Math.max( penumbra, 1 );

                  }

                  model = new THREE.SpotLight( color, intensity, distance, angle, penumbra, decay );
                  break;

                default:
                  console.warn( 'THREE.FBXLoader: Unknown light type ' + lightAttribute.LightType.value + ', defaulting to a THREE.PointLight.' );
                  model = new THREE.PointLight( color, intensity );
                  break;

              }

              if ( lightAttribute.CastShadows !== undefined && lightAttribute.CastShadows.value === 1 ) {

                model.castShadow = true;

              }

            }

          break;

        case 'Mesh':
            /**
             * @type {?THREE.BufferGeometry}
             */
          var geometry = null;

            /**
             * @type {THREE.MultiMaterial|THREE.Material}
             */
          var material = null;

            /**
             * @type {Array.<THREE.Material>}
             */
          var materials = [];

          for ( var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex ) {

              var child = conns.children[ childrenIndex ];

              if ( geometryMap.has( child.ID ) ) {

                geometry = geometryMap.get( child.ID );

              }

              if ( materialMap.has( child.ID ) ) {

                materials.push( materialMap.get( child.ID ) );

              }

            }
          if ( materials.length > 1 ) {

              material = materials;

            } else if ( materials.length > 0 ) {

              material = materials[ 0 ];

            } else {

              material = new THREE.MeshPhongMaterial( { color: 0xcccccc } );
              materials.push( material );

            }
          if ( 'color' in geometry.attributes ) {

              for ( let materialIndex = 0, numMaterials = materials.length; materialIndex < numMaterials; ++materialIndex ) {

                materials[ materialIndex ].vertexColors = THREE.VertexColors;

              }

            }
          if ( geometry.FBX_Deformer ) {

              for ( let materialsIndex = 0, materialsLength = materials.length; materialsIndex < materialsLength; ++materialsIndex ) {

                materials[ materialsIndex ].skinning = true;

              }
              model = new THREE.SkinnedMesh( geometry, material );

            } else {

              model = new THREE.Mesh( geometry, material );

            }
          break;

        case 'NurbsCurve':
          var geometry = null;

          for ( var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex ) {

              var child = conns.children[ childrenIndex ];

              if ( geometryMap.has( child.ID ) ) {

                geometry = geometryMap.get( child.ID );

              }

            }

            // FBX does not list materials for Nurbs lines, so we'll just put our own in here.
          material = new THREE.LineBasicMaterial( { color: 0x3300ff, linewidth: 5 } );
          model = new THREE.Line( geometry, material );
          break;

        default:
          model = new THREE.Group();
          break;

      }

    }

    model.name = THREE.PropertyBinding.sanitizeNodeName( node.attrName );
    model.FBX_ID = id;

    modelArray.push( model );
    modelMap.set( id, model );

  }

  for ( let modelArrayIndex = 0, modelArrayLength = modelArray.length; modelArrayIndex < modelArrayLength; ++modelArrayIndex ) {

    var model = modelArray[ modelArrayIndex ];

    var node = ModelNode[ model.FBX_ID ];

    if ( 'Lcl_Translation' in node.properties ) {

      model.position.fromArray( node.properties.Lcl_Translation.value );

    }

    if ( 'Lcl_Rotation' in node.properties ) {

      const rotation = node.properties.Lcl_Rotation.value.map( degreeToRadian );
      rotation.push( 'ZYX' );
      model.rotation.fromArray( rotation );

    }

    if ( 'Lcl_Scaling' in node.properties ) {

      model.scale.fromArray( node.properties.Lcl_Scaling.value );

    }

    if ( 'PreRotation' in node.properties ) {

      let preRotations = new THREE.Euler().setFromVector3( parseVector3( node.properties.PreRotation ).multiplyScalar( DEG2RAD ), 'ZYX' );
      preRotations = new THREE.Quaternion().setFromEuler( preRotations );
      const currentRotation = new THREE.Quaternion().setFromEuler( model.rotation );
      preRotations.multiply( currentRotation );
      model.rotation.setFromQuaternion( preRotations, 'ZYX' );

    }

      // allow transformed pivots - see https://github.com/mrdoob/three.js/issues/11895
    if ( 'GeometricTranslation' in node.properties ) {

      var array = node.properties.GeometricTranslation.value;

      model.traverse( ( child ) => {

        if ( child.geometry ) {

            child.geometry.translate( array[ 0 ], array[ 1 ], array[ 2 ] );

          }

      } );

    }

    if ( 'LookAtProperty' in node.properties ) {

      var conns = connections.get( model.FBX_ID );

      for ( var childrenIndex = 0, childrenLength = conns.children.length; childrenIndex < childrenLength; ++childrenIndex ) {

        var child = conns.children[ childrenIndex ];

        if ( child.relationship === 'LookAtProperty' ) {

            const lookAtTarget = FBXTree.Objects.subNodes.Model[ child.ID ];

            if ( 'Lcl_Translation' in lookAtTarget.properties ) {

              const pos = lookAtTarget.properties.Lcl_Translation.value;

              // DirectionalLight, SpotLight
              if ( model.target !== undefined ) {

                model.target.position.set( pos[ 0 ], pos[ 1 ], pos[ 2 ] );
                sceneGraph.add( model.target );


              } else { // Cameras and other Object3Ds

                model.lookAt( new THREE.Vector3( pos[ 0 ], pos[ 1 ], pos[ 2 ] ) );

              }

            }

          }

      }

    }

    var conns = connections.get( model.FBX_ID );
    for ( var parentIndex = 0; parentIndex < conns.parents.length; parentIndex++ ) {

      const pIndex = findIndex( modelArray, ( mod ) => {

        return mod.FBX_ID === conns.parents[ parentIndex ].ID;

      } );
      if ( pIndex > -1 ) {

        modelArray[ pIndex ].add( model );
        break;

      }

    }
    if ( model.parent === null ) {

      sceneGraph.add( model );

    }

  }


    // Now with the bones created, we can update the skeletons and bind them to the skinned meshes.
  sceneGraph.updateMatrixWorld( true );

  const worldMatrices = new Map();

    // Put skeleton into bind pose.
  if ( 'Pose' in FBXTree.Objects.subNodes ) {

    let BindPoseNode = FBXTree.Objects.subNodes.Pose;
    for ( var nodeID in BindPoseNode ) {

      if ( BindPoseNode[ nodeID ].attrType === 'BindPose' ) {

        BindPoseNode = BindPoseNode[ nodeID ];
        break;

      }

    }

    const PoseNode = BindPoseNode.subNodes.PoseNode;

    for ( let PoseNodeIndex = 0, PoseNodeLength = PoseNode.length; PoseNodeIndex < PoseNodeLength; ++PoseNodeIndex ) {

      var node = PoseNode[ PoseNodeIndex ];

      const rawMatWrd = node.subNodes.Matrix.properties.a;

      worldMatrices.set( parseInt( node.id ), rawMatWrd );

    }

  }

  for ( var FBX_ID in deformers ) {

    var deformer = deformers[ FBX_ID ];
    var subDeformers = deformer.map;

    for ( const key in subDeformers ) {

      var subDeformer = subDeformers[ key ];
      const subDeformerIndex = subDeformer.index;

        /**
         * @type {THREE.Bone}
         */
      const bone = deformer.bones[ subDeformerIndex ];
      if ( !worldMatrices.has( bone.FBX_ID ) ) {

        break;

      }
      const mat = worldMatrices.get( bone.FBX_ID );
      bone.matrixWorld.copy( mat );

    }

      // Now that skeleton is in bind pose, bind to model.
    deformer.skeleton = new THREE.Skeleton( deformer.bones );

    var conns = connections.get( deformer.FBX_ID );
    const parents = conns.parents;

    for ( let parentsIndex = 0, parentsLength = parents.length; parentsIndex < parentsLength; ++parentsIndex ) {

      const parent = parents[ parentsIndex ];

      if ( geometryMap.has( parent.ID ) ) {

        const geoID = parent.ID;
        const geoConns = connections.get( geoID );

        for ( var i = 0; i < geoConns.parents.length; ++i ) {

            if ( modelMap.has( geoConns.parents[ i ].ID ) ) {

              var model = modelMap.get( geoConns.parents[ i ].ID );
              // ASSERT model typeof SkinnedMesh
              model.bind( deformer.skeleton, model.matrixWorld );
              break;

            }

          }

      }

    }

  }

    // Skeleton is now bound, return objects to starting
    // world positions.
  sceneGraph.updateMatrixWorld( true );

    // Silly hack with the animation parsing.  We're gonna pretend the scene graph has a skeleton
    // to attach animations to, since FBX treats animations as animations for the entire scene,
    // not just for individual objects.
  sceneGraph.skeleton = {
    bones: modelArray,
  };

  const animations = parseAnimations( FBXTree, connections, sceneGraph );

  addAnimations( sceneGraph, animations );


    // Parse ambient color - if it's not set to black (default), create an ambient light
  if ( 'GlobalSettings' in FBXTree && 'AmbientColor' in FBXTree.GlobalSettings.properties ) {

    const ambientColor = FBXTree.GlobalSettings.properties.AmbientColor.value;
    const r = ambientColor[ 0 ];
    const g = ambientColor[ 1 ];
    const b = ambientColor[ 2 ];

    if ( r !== 0 || g !== 0 || b !== 0 ) {

      var color = new THREE.Color( r, g, b );
      sceneGraph.add( new THREE.AmbientLight( color, 1 ) );

    }

  }


  return sceneGraph;

}

  /**
   * Parses animation information from FBXTree and generates an AnimationInfoObject.
   * @param {{Objects: {subNodes: {AnimationCurveNode: any, AnimationCurve: any, AnimationLayer: any, AnimationStack: any}}}} FBXTree
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   */
function parseAnimations( FBXTree, connections, sceneGraph ) {

  const rawNodes = FBXTree.Objects.subNodes.AnimationCurveNode;
  const rawCurves = FBXTree.Objects.subNodes.AnimationCurve;
  const rawLayers = FBXTree.Objects.subNodes.AnimationLayer;
  const rawStacks = FBXTree.Objects.subNodes.AnimationStack;

  let fps = 30; // default framerate

  if ( 'GlobalSettings' in FBXTree && 'TimeMode' in FBXTree.GlobalSettings.properties ) {

      /* Autodesk time mode documentation can be found here:
      *	http://docs.autodesk.com/FBX/2014/ENU/FBX-SDK-Documentation/index.html?url=cpp_ref/class_fbx_time.html,topicNumber=cpp_ref_class_fbx_time_html
      */
    const timeModeEnum = [
      30, // 0: eDefaultMode
      120, // 1: eFrames120
      100, // 2: eFrames100
      60, // 3: eFrames60
      50, // 4: eFrames50
      48, // 5: eFrames48
      30, // 6: eFrames30 (black and white NTSC )
      30, // 7: eFrames30Drop
      29.97, // 8: eNTSCDropFrame
      29.97, // 90: eNTSCFullFrame
      25, // 10: ePal ( PAL/SECAM )
      24, // 11: eFrames24 (Film/Cinema)
      1, // 12: eFrames1000 (use for date time))
      23.976, // 13: eFilmFullFrame
      30, // 14: eCustom: use GlobalSettings.properties.CustomFrameRate.value
      96, // 15: eFrames96
      72, // 16:  eFrames72
      59.94, // 17: eFrames59dot94
    ];

    const eMode = FBXTree.GlobalSettings.properties.TimeMode.value;

    if ( eMode === 14 ) {

      if ( 'CustomFrameRate' in FBXTree.GlobalSettings.properties ) {

        fps = FBXTree.GlobalSettings.properties.CustomFrameRate.value;

        fps = ( fps === -1 ) ? 30 : fps;

      }

    } else if ( eMode <= 17 ) { // for future proofing - if more eModes get added, they will default to 30fps

      fps = timeModeEnum[ eMode ];

    }

  }


    /**
     * @type {{
         curves: Map<number, {
         T: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          };
        },
          R: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          };
        },
          S: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          };
        }
        }>,
        layers: Map<number, {
        T: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          },
        },
        R: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          },
        },
        S: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          },
        }
        }[]>,
        stacks: Map<number, {
          name: string,
          layers: {
          T: {
            id: number;
            attr: string;
            internalID: number;
            attrX: boolean;
            attrY: boolean;
            attrZ: boolean;
            containerBoneID: number;
            containerID: number;
            curves: {
              x: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
              y: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
              z: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
            };
          };
          R: {
            id: number;
            attr: string;
            internalID: number;
            attrX: boolean;
            attrY: boolean;
            attrZ: boolean;
            containerBoneID: number;
            containerID: number;
            curves: {
              x: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
              y: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
              z: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
            };
          };
          S: {
            id: number;
            attr: string;
            internalID: number;
            attrX: boolean;
            attrY: boolean;
            attrZ: boolean;
            containerBoneID: number;
            containerID: number;
            curves: {
              x: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
              y: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
              z: {
                version: any;
                id: number;
                internalID: number;
                times: number[];
                values: number[];
                attrFlag: number[];
                attrData: number[];
              };
            };
          };
        }[][],
        length: number,
        frames: number }>,
        length: number,
        fps: number,
        frames: number
      }}
      */
  const returnObject = {
    curves: new Map(),
    layers: {},
    stacks: {},
    length: 0,
    fps,
    frames: 0,
  };

    /**
     * @type {Array.<{
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
      }>}
      */
  const animationCurveNodes = [];
  for ( var nodeID in rawNodes ) {

    if ( nodeID.match( /\d+/ ) ) {

      const animationNode = parseAnimationNode( FBXTree, rawNodes[ nodeID ], connections, sceneGraph );
      animationCurveNodes.push( animationNode );

    }

  }

    /**
     * @type {Map.<number, {
        id: number,
        attr: string,
        internalID: number,
        attrX: boolean,
        attrY: boolean,
        attrZ: boolean,
        containerBoneID: number,
        containerID: number,
        curves: {
          x: {
            version: any,
            id: number,
            internalID: number,
            times: number[],
            values: number[],
            attrFlag: number[],
            attrData: number[],
          },
          y: {
            version: any,
            id: number,
            internalID: number,
            times: number[],
            values: number[],
            attrFlag: number[],
            attrData: number[],
          },
          z: {
            version: any,
            id: number,
            internalID: number,
            times: number[],
            values: number[],
            attrFlag: number[],
            attrData: number[],
          }
        }
      }>}
      */
  const tmpMap = new Map();
  for ( let animationCurveNodeIndex = 0; animationCurveNodeIndex < animationCurveNodes.length; ++animationCurveNodeIndex ) {

    if ( animationCurveNodes[ animationCurveNodeIndex ] === null ) {

      continue;

    }
    tmpMap.set( animationCurveNodes[ animationCurveNodeIndex ].id, animationCurveNodes[ animationCurveNodeIndex ] );

  }


    /**
     * @type {{
        version: any,
        id: number,
        internalID: number,
        times: number[],
        values: number[],
        attrFlag: number[],
        attrData: number[],
      }[]}
      */
  const animationCurves = [];
  for ( nodeID in rawCurves ) {

    if ( nodeID.match( /\d+/ ) ) {

      const animationCurve = parseAnimationCurve( rawCurves[ nodeID ] );

        // seems like this check would be necessary?
      if ( !connections.has( animationCurve.id ) ) continue;

      animationCurves.push( animationCurve );

      const firstParentConn = connections.get( animationCurve.id ).parents[ 0 ];
      const firstParentID = firstParentConn.ID;
      const firstParentRelationship = firstParentConn.relationship;
      let axis = '';

      if ( firstParentRelationship.match( /X/ ) ) {

        axis = 'x';

      } else if ( firstParentRelationship.match( /Y/ ) ) {

          axis = 'y';

        } else if ( firstParentRelationship.match( /Z/ ) ) {

          axis = 'z';

        } else {

          continue;

        }

      tmpMap.get( firstParentID ).curves[ axis ] = animationCurve;

    }

  }

  tmpMap.forEach( ( curveNode ) => {

    const id = curveNode.containerBoneID;
    if ( !returnObject.curves.has( id ) ) {

      returnObject.curves.set( id, { T: null, R: null, S: null } );

    }
    returnObject.curves.get( id )[ curveNode.attr ] = curveNode;

    if ( curveNode.attr === 'R' ) {

      const curves = curveNode.curves;

        // Seems like some FBX files have AnimationCurveNode
        // which doesn't have any connected AnimationCurve.
        // Setting animation parameter for them here.

      if ( curves.x === null ) {

        curves.x = {
            version: null,
            times: [ 0.0 ],
            values: [ 0.0 ],
          };

      }

      if ( curves.y === null ) {

        curves.y = {
            version: null,
            times: [ 0.0 ],
            values: [ 0.0 ],
          };

      }

      if ( curves.z === null ) {

        curves.z = {
            version: null,
            times: [ 0.0 ],
            values: [ 0.0 ],
          };

      }

      curves.x.values = curves.x.values.map( degreeToRadian );
      curves.y.values = curves.y.values.map( degreeToRadian );
      curves.z.values = curves.z.values.map( degreeToRadian );

      if ( curveNode.preRotations !== null ) {

        let preRotations = new THREE.Euler().setFromVector3( curveNode.preRotations, 'ZYX' );
        preRotations = new THREE.Quaternion().setFromEuler( preRotations );
        const frameRotation = new THREE.Euler();
        const frameRotationQuaternion = new THREE.Quaternion();
        for ( let frame = 0; frame < curves.x.times.length; ++frame ) {

            frameRotation.set( curves.x.values[ frame ], curves.y.values[ frame ], curves.z.values[ frame ], 'ZYX' );
            frameRotationQuaternion.setFromEuler( frameRotation ).premultiply( preRotations );
            frameRotation.setFromQuaternion( frameRotationQuaternion, 'ZYX' );
            curves.x.values[ frame ] = frameRotation.x;
            curves.y.values[ frame ] = frameRotation.y;
            curves.z.values[ frame ] = frameRotation.z;

          }

      }

    }

  } );

  for ( var nodeID in rawLayers ) {

      /**
       * @type {{
        T: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          },
        },
        R: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          },
        },
        S: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          },
        }
        }[]}
        */
    var layer = [];
    var children = connections.get( parseInt( nodeID ) ).children;

    for ( var childIndex = 0; childIndex < children.length; childIndex++ ) {

        // Skip lockInfluenceWeights
      if ( tmpMap.has( children[ childIndex ].ID ) ) {

        const curveNode = tmpMap.get( children[ childIndex ].ID );
        const boneID = curveNode.containerBoneID;
        if ( layer[ boneID ] === undefined ) {

            layer[ boneID ] = {
              T: null,
              R: null,
              S: null,
            };

          }

        layer[ boneID ][ curveNode.attr ] = curveNode;

      }

    }

    returnObject.layers[ nodeID ] = layer;

  }

  for ( var nodeID in rawStacks ) {

    const layers = [];
    var children = connections.get( parseInt( nodeID ) ).children;
    const timestamps = { max: 0, min: Number.MAX_VALUE };

    for ( var childIndex = 0; childIndex < children.length; ++childIndex ) {

      const currentLayer = returnObject.layers[ children[ childIndex ].ID ];

      if ( currentLayer !== undefined ) {

        layers.push( currentLayer );

        for ( let currentLayerIndex = 0, currentLayerLength = currentLayer.length; currentLayerIndex < currentLayerLength; ++currentLayerIndex ) {

            var layer = currentLayer[ currentLayerIndex ];

            if ( layer ) {

              getCurveNodeMaxMinTimeStamps( layer, timestamps );

            }

          }

      }

    }

      // Do we have an animation clip with actual length?
    if ( timestamps.max > timestamps.min ) {

      returnObject.stacks[ nodeID ] = {
        name: rawStacks[ nodeID ].attrName,
        layers,
        length: timestamps.max - timestamps.min,
        frames: ( timestamps.max - timestamps.min ) * returnObject.fps,
      };

    }

  }

  return returnObject;

}

  /**
   * @param {Object} FBXTree
   * @param {{id: number, attrName: string, properties: Object<string, any>}} animationCurveNode
   * @param {Map<number, {parents: {ID: number, relationship: string}[], children: {ID: number, relationship: string}[]}>} connections
   * @param {{skeleton: {bones: {FBX_ID: number}[]}}} sceneGraph
   */
function parseAnimationNode( FBXTree, animationCurveNode, connections, sceneGraph ) {

  const rawModels = FBXTree.Objects.subNodes.Model;

  const returnObject = {
      /**
       * @type {number}
       */
    id: animationCurveNode.id,

      /**
       * @type {string}
       */
    attr: animationCurveNode.attrName,

      /**
       * @type {number}
       */
    internalID: animationCurveNode.id,

      /**
       * @type {boolean}
       */
    attrX: false,

      /**
       * @type {boolean}
       */
    attrY: false,

      /**
       * @type {boolean}
       */
    attrZ: false,

      /**
       * @type {number}
       */
    containerBoneID: -1,

      /**
       * @type {number}
       */
    containerID: -1,

    curves: {
      x: null,
      y: null,
      z: null,
    },

      /**
       * @type {number[]}
       */
    preRotations: null,
  };

  if ( returnObject.attr.match( /S|R|T/ ) ) {

    for ( const attributeKey in animationCurveNode.properties ) {

      if ( attributeKey.match( /X/ ) ) {

        returnObject.attrX = true;

      }
      if ( attributeKey.match( /Y/ ) ) {

        returnObject.attrY = true;

      }
      if ( attributeKey.match( /Z/ ) ) {

        returnObject.attrZ = true;

      }

    }

  } else {

    return null;

  }

  const conns = connections.get( returnObject.id );
  const containerIndices = conns.parents;

  for ( var containerIndicesIndex = containerIndices.length - 1; containerIndicesIndex >= 0; --containerIndicesIndex ) {

    const boneID = findIndex( sceneGraph.skeleton.bones, ( bone ) => {

      return bone.FBX_ID === containerIndices[ containerIndicesIndex ].ID;

    } );
    if ( boneID > -1 ) {

      returnObject.containerBoneID = boneID;
      returnObject.containerID = containerIndices[ containerIndicesIndex ].ID;
      const model = rawModels[ returnObject.containerID.toString() ];
      if ( 'PreRotation' in model.properties ) {

        returnObject.preRotations = parseVector3( model.properties.PreRotation ).multiplyScalar( Math.PI / 180 );

      }
      break;

    }

  }

  return returnObject;

}

  /**
   * @param {{id: number, subNodes: {KeyTime: {properties: {a: string}}, KeyValueFloat: {properties: {a: string}}, KeyAttrFlags: {properties: {a: string}}, KeyAttrDataFloat: {properties: {a: string}}}}} animationCurve
   */
function parseAnimationCurve( animationCurve ) {

  return {
    version: null,
    id: animationCurve.id,
    internalID: animationCurve.id,
    times: parseNumberArray( animationCurve.subNodes.KeyTime.properties.a ).map( convertFBXTimeToSeconds ),
    values: parseNumberArray( animationCurve.subNodes.KeyValueFloat.properties.a ),

    attrFlag: parseNumberArray( animationCurve.subNodes.KeyAttrFlags.properties.a ),
    attrData: animationCurve.subNodes.KeyAttrDataFloat.properties.a,
  };

}

  /**
   * Sets the maxTimeStamp and minTimeStamp variables if it has timeStamps that are either larger or smaller
   * than the max or min respectively.
   * @param {{
        T: {
            id: number,
            attr: string,
            internalID: number,
            attrX: boolean,
            attrY: boolean,
            attrZ: boolean,
            containerBoneID: number,
            containerID: number,
            curves: {
                x: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
                y: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
                z: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
            },
        },
        R: {
            id: number,
            attr: string,
            internalID: number,
            attrX: boolean,
            attrY: boolean,
            attrZ: boolean,
            containerBoneID: number,
            containerID: number,
            curves: {
                x: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
                y: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
                z: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
            },
        },
        S: {
            id: number,
            attr: string,
            internalID: number,
            attrX: boolean,
            attrY: boolean,
            attrZ: boolean,
            containerBoneID: number,
            containerID: number,
            curves: {
                x: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
                y: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
                z: {
                    version: any,
                    id: number,
                    internalID: number,
                    times: number[],
                    values: number[],
                    attrFlag: number[],
                    attrData: number[],
                },
            },
        },
    }} layer
    */
function getCurveNodeMaxMinTimeStamps( layer, timestamps ) {

  if ( layer.R ) {

    getCurveMaxMinTimeStamp( layer.R.curves, timestamps );

  }
  if ( layer.S ) {

    getCurveMaxMinTimeStamp( layer.S.curves, timestamps );

  }
  if ( layer.T ) {

    getCurveMaxMinTimeStamp( layer.T.curves, timestamps );

  }

}

  /**
   * Sets the maxTimeStamp and minTimeStamp if one of the curve's time stamps
   * exceeds the maximum or minimum.
   * @param {{
        x: {
            version: any,
            id: number,
            internalID: number,
            times: number[],
            values: number[],
            attrFlag: number[],
            attrData: number[],
        },
        y: {
            version: any,
            id: number,
            internalID: number,
            times: number[],
            values: number[],
            attrFlag: number[],
            attrData: number[],
        },
        z: {
            version: any,
            id: number,
            internalID: number,
            times: number[],
            values: number[],
            attrFlag: number[],
            attrData: number[],
        }
    }} curve
    */
function getCurveMaxMinTimeStamp( curve, timestamps ) {

  if ( curve.x ) {

    getCurveAxisMaxMinTimeStamps( curve.x, timestamps );

  }
  if ( curve.y ) {

    getCurveAxisMaxMinTimeStamps( curve.y, timestamps );

  }
  if ( curve.z ) {

    getCurveAxisMaxMinTimeStamps( curve.z, timestamps );

  }

}

  /**
   * Sets the maxTimeStamp and minTimeStamp if one of its timestamps exceeds the maximum or minimum.
   * @param {{times: number[]}} axis
   */
function getCurveAxisMaxMinTimeStamps( axis, timestamps ) {

  timestamps.max = axis.times[ axis.times.length - 1 ] > timestamps.max ? axis.times[ axis.times.length - 1 ] : timestamps.max;
  timestamps.min = axis.times[ 0 ] < timestamps.min ? axis.times[ 0 ] : timestamps.min;

}

  /**
   * @param {{
    curves: Map<number, {
      T: {
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
        curves: {
          x: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          y: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          z: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
        };
      };
      R: {
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
        curves: {
          x: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          y: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          z: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
        };
      };
      S: {
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
        curves: {
          x: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          y: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          z: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
        };
      };
    }>;
    layers: Map<number, {
      T: {
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
        curves: {
          x: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          y: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          z: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
        };
      };
      R: {
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
        curves: {
          x: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          y: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          z: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
        };
      };
      S: {
        id: number;
        attr: string;
        internalID: number;
        attrX: boolean;
        attrY: boolean;
        attrZ: boolean;
        containerBoneID: number;
        containerID: number;
        curves: {
          x: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          y: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
          z: {
            version: any;
            id: number;
            internalID: number;
            times: number[];
            values: number[];
            attrFlag: number[];
            attrData: number[];
          };
        };
      };
    }[]>;
    stacks: Map<number, {
      name: string;
      layers: {
        T: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          };
        };
        R: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          };
        };
        S: {
          id: number;
          attr: string;
          internalID: number;
          attrX: boolean;
          attrY: boolean;
          attrZ: boolean;
          containerBoneID: number;
          containerID: number;
          curves: {
            x: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            y: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
            z: {
              version: any;
              id: number;
              internalID: number;
              times: number[];
              values: number[];
              attrFlag: number[];
              attrData: number[];
            };
          };
        };
      }[][];
      length: number;
      frames: number;
    }>;
    length: number;
    fps: number;
    frames: number;
  }} animations,
    * @param {{skeleton: { bones: THREE.Bone[]}}} group
    */
function addAnimations( group, animations ) {

  if ( group.animations === undefined ) {

    group.animations = [];

  }

  const stacks = animations.stacks;

  for ( const key in stacks ) {

    const stack = stacks[ key ];

      /**
       * @type {{
       * name: string,
       * fps: number,
       * length: number,
       * hierarchy: Array.<{
       * 	parent: number,
       * 	name: string,
       * 	keys: Array.<{
       * 		time: number,
       * 		pos: Array.<number>,
       * 		rot: Array.<number>,
       * 		scl: Array.<number>
       * 	}>
       * }>
       * }}
       */
    const animationData = {
      name: stack.name,
      fps: animations.fps,
      length: stack.length,
      hierarchy: [],
    };

    const bones = group.skeleton.bones;

    for ( var bonesIndex = 0, bonesLength = bones.length; bonesIndex < bonesLength; ++bonesIndex ) {

      var bone = bones[ bonesIndex ];

      const name = bone.name.replace( /.*:/, '' );
      const parentIndex = findIndex( bones, ( parentBone ) => {

        return bone.parent === parentBone;

      } );
      animationData.hierarchy.push( { parent: parentIndex, name, keys: [] } );

    }

    for ( let frame = 0; frame <= stack.frames; frame++ ) {

      for ( var bonesIndex = 0, bonesLength = bones.length; bonesIndex < bonesLength; ++bonesIndex ) {

        var bone = bones[ bonesIndex ];
        const boneIndex = bonesIndex;

        const animationNode = stack.layers[ 0 ][ boneIndex ];

        for ( let hierarchyIndex = 0, hierarchyLength = animationData.hierarchy.length; hierarchyIndex < hierarchyLength; ++hierarchyIndex ) {

            const node = animationData.hierarchy[ hierarchyIndex ];

            if ( node.name === bone.name ) {

              node.keys.push( generateKey( animations, animationNode, bone, frame ) );

            }

          }

      }

    }

    group.animations.push( THREE.AnimationClip.parseAnimation( animationData, bones ) );

  }

}

const euler = new THREE.Euler();
const quaternion = new THREE.Quaternion();

  /**
   * @param {THREE.Bone} bone
   */
function generateKey( animations, animationNode, bone, frame ) {

  const key = {
    time: frame / animations.fps,
    pos: bone.position.toArray(),
    rot: bone.quaternion.toArray(),
    scl: bone.scale.toArray(),
  };

  if ( animationNode === undefined ) return key;

  euler.setFromQuaternion( bone.quaternion, 'ZYX', false );

  try {

    if ( hasCurve( animationNode, 'T' ) && hasKeyOnFrame( animationNode.T, frame ) ) {

      key.pos = [ animationNode.T.curves.x.values[ frame ], animationNode.T.curves.y.values[ frame ], animationNode.T.curves.z.values[ frame ] ];

    }

    if ( hasCurve( animationNode, 'R' ) && hasKeyOnFrame( animationNode.R, frame ) ) {

        // Only update the euler's values if rotation is defined for the axis on this frame
      if ( animationNode.R.curves.x.values[ frame ] ) {

        euler.x = animationNode.R.curves.x.values[ frame ];

      }

      if ( animationNode.R.curves.y.values[ frame ] ) {

        euler.y = animationNode.R.curves.y.values[ frame ];

      }

      if ( animationNode.R.curves.z.values[ frame ] ) {

        euler.z = animationNode.R.curves.z.values[ frame ];

      }

      quaternion.setFromEuler( euler );
      key.rot = quaternion.toArray();

    }

    if ( hasCurve( animationNode, 'S' ) && hasKeyOnFrame( animationNode.S, frame ) ) {

      key.scl = [ animationNode.S.curves.x.values[ frame ], animationNode.S.curves.y.values[ frame ], animationNode.S.curves.z.values[ frame ] ];

    }

  } catch ( error ) {

      // Curve is not fully plotted.
    console.log( 'THREE.FBXLoader: ', bone );
    console.log( 'THREE.FBXLoader: ', error );

  }

  return key;

}

const AXES = [ 'x', 'y', 'z' ];

function hasCurve( animationNode, attribute ) {

  if ( animationNode === undefined ) {

    return false;

  }

  const attributeNode = animationNode[ attribute ];

  if ( !attributeNode ) {

    return false;

  }

  return AXES.every( ( key ) => {

    return attributeNode.curves[ key ] !== null;

  } );

}

function hasKeyOnFrame( attributeNode, frame ) {

  return AXES.every( ( key ) => {

    return isKeyExistOnFrame( attributeNode.curves[ key ], frame );

  } );

}

function isKeyExistOnFrame( curve, frame ) {

  return curve.values[ frame ] !== undefined;

}

  /**
   * An instance of a Vertex with data for drawing vertices to the screen.
   * @constructor
   */
function Vertex() {

    /**
     * Position of the vertex.
     * @type {THREE.Vector3}
     */
  this.position = new THREE.Vector3();

    /**
     * Normal of the vertex
     * @type {THREE.Vector3}
     */
  this.normal = new THREE.Vector3();

    /**
     * Array of UV coordinates of the vertex.
     * @type {Array of THREE.Vector2}
     */
  this.uv = [];

    /**
     * Color of the vertex
     * @type {THREE.Vector3}
     */
  this.color = new THREE.Vector3();

    /**
     * Indices of the bones vertex is influenced by.
     * @type {THREE.Vector4}
     */
  this.skinIndices = new THREE.Vector4( 0, 0, 0, 0 );

    /**
     * Weights that each bone influences the vertex.
     * @type {THREE.Vector4}
     */
  this.skinWeights = new THREE.Vector4( 0, 0, 0, 0 );

}

Object.assign( Vertex.prototype, {

  copy( target ) {

    const returnVar = target || new Vertex();

    returnVar.position.copy( this.position );
    returnVar.normal.copy( this.normal );
    returnVar.uv.copy( this.uv );
    returnVar.skinIndices.copy( this.skinIndices );
    returnVar.skinWeights.copy( this.skinWeights );

    return returnVar;

  },

  flattenToBuffers( vertexBuffer, normalBuffer, uvBuffers, colorBuffer, skinIndexBuffer, skinWeightBuffer ) {

    this.position.toArray( vertexBuffer, vertexBuffer.length );
    this.normal.toArray( normalBuffer, normalBuffer.length );

    for ( let i = 0; i < this.uv.length; i++ ) {

      this.uv[ i ].toArray( uvBuffers[ i ], uvBuffers[ i ].length );

    }
    this.color.toArray( colorBuffer, colorBuffer.length );
    this.skinIndices.toArray( skinIndexBuffer, skinIndexBuffer.length );
    this.skinWeights.toArray( skinWeightBuffer, skinWeightBuffer.length );

  },

} );

  /**
   * @constructor
   */
function Triangle() {

    /**
     * @type {{position: THREE.Vector3, normal: THREE.Vector3, uv: THREE.Vector2, skinIndices: THREE.Vector4, skinWeights: THREE.Vector4}[]}
     */
  this.vertices = [];

}

Object.assign( Triangle.prototype, {

  copy( target ) {

    const returnVar = target || new Triangle();

    for ( let i = 0; i < this.vertices.length; ++i ) {

      this.vertices[ i ].copy( returnVar.vertices[ i ] );

    }

    return returnVar;

  },

  flattenToBuffers( vertexBuffer, normalBuffer, uvBuffers, colorBuffer, skinIndexBuffer, skinWeightBuffer ) {

    const vertices = this.vertices;

    for ( let i = 0, l = vertices.length; i < l; ++i ) {

      vertices[ i ].flattenToBuffers( vertexBuffer, normalBuffer, uvBuffers, colorBuffer, skinIndexBuffer, skinWeightBuffer );

    }

  },

} );

  /**
   * @constructor
   */
function Face() {

    /**
     * @type {{vertices: {position: THREE.Vector3, normal: THREE.Vector3, uv: THREE.Vector2, skinIndices: THREE.Vector4, skinWeights: THREE.Vector4}[]}[]}
     */
  this.triangles = [];
  this.materialIndex = 0;

}

Object.assign( Face.prototype, {

  copy( target ) {

    const returnVar = target || new Face();

    for ( let i = 0; i < this.triangles.length; ++i ) {

      this.triangles[ i ].copy( returnVar.triangles[ i ] );

    }

    returnVar.materialIndex = this.materialIndex;

    return returnVar;

  },

  genTrianglesFromVertices( vertexArray ) {

    for ( let i = 2; i < vertexArray.length; ++i ) {

      const triangle = new Triangle();
      triangle.vertices[ 0 ] = vertexArray[ 0 ];
      triangle.vertices[ 1 ] = vertexArray[ i - 1 ];
      triangle.vertices[ 2 ] = vertexArray[ i ];
      this.triangles.push( triangle );

    }

  },

  flattenToBuffers( vertexBuffer, normalBuffer, uvBuffers, colorBuffer, skinIndexBuffer, skinWeightBuffer, materialIndexBuffer ) {

    const triangles = this.triangles;
    const materialIndex = this.materialIndex;

    for ( let i = 0, l = triangles.length; i < l; ++i ) {

      triangles[ i ].flattenToBuffers( vertexBuffer, normalBuffer, uvBuffers, colorBuffer, skinIndexBuffer, skinWeightBuffer );
      append( materialIndexBuffer, [ materialIndex, materialIndex, materialIndex ] );

    }

  },

} );

  /**
   * @constructor
   */
function Geometry() {

    /**
     * @type {{triangles: {vertices: {position: THREE.Vector3, normal: THREE.Vector3, uv: Array of THREE.Vector2, skinIndices: THREE.Vector4, skinWeights: THREE.Vector4}[]}[], materialIndex: number}[]}
     */
  this.faces = [];

    /**
     * @type {{}|THREE.Skeleton}
     */
  this.skeleton = null;

}

Object.assign( Geometry.prototype, {

    /**
     * @returns	{{vertexBuffer: number[], normalBuffer: number[], uvBuffers: Array of number[], skinIndexBuffer: number[], skinWeightBuffer: number[], materialIndexBuffer: number[]}}
     */
  flattenToBuffers() {

    const vertexBuffer = [];
    const normalBuffer = [];
    const uvBuffers = [];
    const colorBuffer = [];
    const skinIndexBuffer = [];
    const skinWeightBuffer = [];
    const materialIndexBuffer = [];

    const faces = this.faces;

    for ( var i = 0; i < faces[ 0 ].triangles[ 0 ].vertices[ 0 ].uv.length; i++ ) {

      uvBuffers.push( [] );

    }

    for ( var i = 0, l = faces.length; i < l; ++i ) {

      faces[ i ].flattenToBuffers( vertexBuffer, normalBuffer, uvBuffers, colorBuffer, skinIndexBuffer, skinWeightBuffer, materialIndexBuffer );

    }

    return {
      vertexBuffer,
      normalBuffer,
      uvBuffers,
      colorBuffer,
      skinIndexBuffer,
      skinWeightBuffer,
      materialIndexBuffer,
    };

  },

} );

function TextParser() {}

Object.assign( TextParser.prototype, {

  getPrevNode() {

    return this.nodeStack[ this.currentIndent - 2 ];

  },

  getCurrentNode() {

    return this.nodeStack[ this.currentIndent - 1 ];

  },

  getCurrentProp() {

    return this.currentProp;

  },

  pushStack( node ) {

    this.nodeStack.push( node );
    this.currentIndent += 1;

  },

  popStack() {

    this.nodeStack.pop();
    this.currentIndent -= 1;

  },

  setCurrentProp( val, name ) {

    this.currentProp = val;
    this.currentPropName = name;

  },

    // ----------parse ---------------------------------------------------
  parse( text ) {

    this.currentIndent = 0;
    this.allNodes = new FBXTree();
    this.nodeStack = [];
    this.currentProp = [];
    this.currentPropName = '';

    const split = text.split( '\n' );

    for ( let lineNum = 0, lineLength = split.length; lineNum < lineLength; lineNum++ ) {

      var l = split[ lineNum ];

        // skip comment line
      if ( l.match( /^[\s\t]*;/ ) ) {

        continue;

      }

        // skip empty line
      if ( l.match( /^[\s\t]*$/ ) ) {

        continue;

      }

        // beginning of node
      const beginningOfNodeExp = new RegExp( '^\\t{' + this.currentIndent + '}(\\w+):(.*){', '' );
      var match = l.match( beginningOfNodeExp );

      if ( match ) {

        const nodeName = match[ 1 ].trim().replace( /^"/, '' ).replace( /"$/, '' );
        const nodeAttrs = match[ 2 ].split( ',' );

        for ( var i = 0, l = nodeAttrs.length; i < l; i++ ) {

            nodeAttrs[ i ] = nodeAttrs[ i ].trim().replace( /^"/, '' ).replace( /"$/, '' );

          }

        this.parseNodeBegin( l, nodeName, nodeAttrs || null );
        continue;

      }

        // node's property
      const propExp = new RegExp( '^\\t{' + ( this.currentIndent ) + '}(\\w+):[\\s\\t\\r\\n](.*)' );
      var match = l.match( propExp );

      if ( match ) {

        const propName = match[ 1 ].replace( /^"/, '' ).replace( /"$/, '' ).trim();
        let propValue = match[ 2 ].replace( /^"/, '' ).replace( /"$/, '' ).trim();

          // for special case: base64 image data follows "Content: ," line
          //	Content: ,
          //	 "iVB..."
        if ( propName === 'Content' && propValue === ',' ) {

            propValue = split[ ++lineNum ].replace( /"/g, '' ).replace( /,$/, '' ).trim();

          }

        this.parseNodeProperty( l, propName, propValue );
        continue;

      }

        // end of node
      const endOfNodeExp = new RegExp( '^\\t{' + ( this.currentIndent - 1 ) + '}}' );

      if ( l.match( endOfNodeExp ) ) {

        this.nodeEnd();
        continue;

      }

        // for special case,
        //
        //	  Vertices: *8670 {
        //		  a: 0.0356229953467846,13.9599733352661,-0.399196773.....(snip)
        // -0.0612030513584614,13.960485458374,-0.409748703241348,-0.10.....
        // 0.12490539252758,13.7450733184814,-0.454119384288788,0.09272.....
        // 0.0836158767342567,13.5432004928589,-0.435397416353226,0.028.....
        //
        // in these case the lines must continue from the previous line
      if ( l.match( /^[^\s\t}]/ ) ) {

        this.parseNodePropertyContinued( l );

      }

    }

    return this.allNodes;

  },

  parseNodeBegin( line, nodeName, nodeAttrs ) {

    const node = { name: nodeName, properties: {}, subNodes: {} };
    const attrs = this.parseNodeAttr( nodeAttrs );
    const currentNode = this.getCurrentNode();

      // a top node
    if ( this.currentIndent === 0 ) {

      this.allNodes.add( nodeName, node );

    } else { // a subnode

        // if the subnode already exists, append it
      if ( nodeName in currentNode.subNodes ) {

        const tmp = currentNode.subNodes[ nodeName ];

          // console.log( "duped entry found\nkey: " + nodeName + "\nvalue: " + propValue );
        if ( this.isFlattenNode( currentNode.subNodes[ nodeName ] ) ) {


            if ( attrs.id === '' ) {

              currentNode.subNodes[ nodeName ] = [];
              currentNode.subNodes[ nodeName ].push( tmp );

            } else {

              currentNode.subNodes[ nodeName ] = {};
              currentNode.subNodes[ nodeName ][ tmp.id ] = tmp;

            }

          }

        if ( attrs.id === '' ) {

            currentNode.subNodes[ nodeName ].push( node );

          } else {

            currentNode.subNodes[ nodeName ][ attrs.id ] = node;

          }

      } else if ( typeof attrs.id === 'number' || attrs.id.match( /^\d+$/ ) ) {

          currentNode.subNodes[ nodeName ] = {};
          currentNode.subNodes[ nodeName ][ attrs.id ] = node;

        } else {

          currentNode.subNodes[ nodeName ] = node;

        }

    }


      // for this		  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      // NodeAttribute: 1001463072, "NodeAttribute::", "LimbNode" {
    if ( nodeAttrs ) {

      node.id = attrs.id;
      node.attrName = attrs.name;
      node.attrType = attrs.type;

    }

    this.pushStack( node );

  },

  parseNodeAttr( attrs ) {

    let id = attrs[ 0 ];

    if ( attrs[ 0 ] !== '' ) {

      id = parseInt( attrs[ 0 ] );

      if ( isNaN( id ) ) {

          // PolygonVertexIndex: *16380 {
        id = attrs[ 0 ];

      }

    }

    let name = '', type = '';

    if ( attrs.length > 1 ) {

      name = attrs[ 1 ].replace( /^(\w+)::/, '' );
      type = attrs[ 2 ];

    }

    return { id, name, type };

  },

  parseNodeProperty( line, propName, propValue ) {

    const currentNode = this.getCurrentNode();
    const parentName = currentNode.name;

      // special case where the parent node is something like "Properties70"
      // these children nodes must treated carefully
    if ( parentName !== undefined ) {

      const propMatch = parentName.match( /Properties(\d)+/ );
      if ( propMatch ) {

        this.parseNodeSpecialProperty( line, propName, propValue );
        return;

      }

    }

      // ...parentName.properties.a
    if ( propName === 'a' ) {

      switch ( parentName ) {

        case 'Matrix':
        case 'TransformLink':
        case 'Transform':
          propValue = new THREE.Matrix4().fromArray( parseNumberArray( propValue ) );
          break;

        case 'ColorIndex':
        case 'Colors':
        case 'KeyAttrDataFloat':
        case 'KnotVector':
        case 'NormalIndex':
        case 'NormalsIndex':
        case 'Points':
          propValue = parseNumberArray( propValue );
          break;

          // TODO: for the following properties this check is not catching all occurences
          // case 'KeyTime':
          // case 'Normals':
          // case 'UV':
          // case 'Vertices':
          // case 'KeyValueFloat':
          // case 'Weights':

          // case 'Materials':
          // case 'PolygonVertexIndex':
          // case 'UVIndex':

      }

    }

      // Connections
    if ( propName === 'C' ) {

      const connProps = propValue.split( ',' ).slice( 1 );
      const from = parseInt( connProps[ 0 ] );
      const to = parseInt( connProps[ 1 ] );

      let rest = propValue.split( ',' ).slice( 3 );

      rest = rest.map( ( elem ) => {

        return elem.trim().replace( /^"/, '' );

      } );

      propName = 'connections';
      propValue = [ from, to ];
      append( propValue, rest );

      if ( currentNode.properties[ propName ] === undefined ) {

        currentNode.properties[ propName ] = [];

      }

    }

      // Node
    if ( propName === 'Node' ) {

      const id = parseInt( propValue );
      currentNode.properties.id = id;
      currentNode.id = id;

    }

      // already exists in properties, then append this
    if ( propName in currentNode.properties ) {

      if ( Array.isArray( currentNode.properties[ propName ] ) ) {

        currentNode.properties[ propName ].push( propValue );

      } else {

        currentNode.properties[ propName ] += propValue;

      }

    } else if ( Array.isArray( currentNode.properties[ propName ] ) ) {


      currentNode.properties[ propName ].push( propValue );

    } else {

      currentNode.properties[ propName ] = propValue;

    }

    this.setCurrentProp( currentNode.properties, propName );

  },

    // TODO:
  parseNodePropertyContinued( line ) {

    this.currentProp[ this.currentPropName ] += line;

  },

  parseNodeSpecialProperty( line, propName, propValue ) {

      // split this
      // P: "Lcl Scaling", "Lcl Scaling", "", "A",1,1,1
      // into array like below
      // ["Lcl Scaling", "Lcl Scaling", "", "A", "1,1,1" ]
    const props = propValue.split( '",' );

    for ( let i = 0, l = props.length; i < l; i++ ) {

      props[ i ] = props[ i ].trim().replace( /^\"/, '' ).replace( /\s/, '_' );

    }

    const innerPropName = props[ 0 ];
    const innerPropType1 = props[ 1 ];
    const innerPropType2 = props[ 2 ];
    const innerPropFlag = props[ 3 ];
    let innerPropValue = props[ 4 ];

      /*
      if ( innerPropValue === undefined ) {
        innerPropValue = props[3];
      }
      */

      // cast value to its type
    switch ( innerPropType1 ) {

      case 'int':
      case 'enum':
      case 'bool':
      case 'ULongLong':
        innerPropValue = parseInt( innerPropValue );
        break;

      case 'double':
      case 'Number':
      case 'FieldOfView':
        innerPropValue = parseFloat( innerPropValue );
        break;

      case 'ColorRGB':
      case 'Vector3D':
      case 'Lcl_Translation':
      case 'Lcl_Rotation':
      case 'Lcl_Scaling':
        innerPropValue = parseNumberArray( innerPropValue );
        break;

    }

      // CAUTION: these props must append to parent's parent
    this.getPrevNode().properties[ innerPropName ] = {

      type: innerPropType1,
      type2: innerPropType2,
      flag: innerPropFlag,
      value: innerPropValue,

    };

    this.setCurrentProp( this.getPrevNode().properties, innerPropName );

  },

  nodeEnd() {

    this.popStack();

  },

    /* ---------------------------------------------------------------- */
    /*		util													  */
  isFlattenNode( node ) {

    return !!( ( 'subNodes' in node && 'properties' in node ) );

  },

} );

  // Binary format specification:
  //   https://code.blender.org/2013/08/fbx-binary-file-format-specification/
  //   https://wiki.rogiken.org/specifications/file-format/fbx/ (more detail but Japanese)
function BinaryParser() {}

Object.assign( BinaryParser.prototype, {

    /**
     * Parses binary data and builds FBXTree as much compatible as possible with the one built by TextParser.
     * @param {ArrayBuffer} buffer
     * @returns {THREE.FBXTree}
     */
  parse( buffer ) {

    const reader = new BinaryReader( buffer );
    reader.skip( 23 ); // skip magic 23 bytes

    const version = reader.getUint32();

    console.log( 'THREE.FBXLoader: FBX binary version: ' + version );

    const allNodes = new FBXTree();

    while ( !this.endOfContent( reader ) ) {

      const node = this.parseNode( reader, version );
      if ( node !== null ) allNodes.add( node.name, node );

    }

    return allNodes;

  },

    /**
     * Checks if reader has reached the end of content.
     * @param {BinaryReader} reader
     * @returns {boolean}
     */
  endOfContent( reader ) {

      // footer size: 160bytes + 16-byte alignment padding
      // - 16bytes: magic
      // - padding til 16-byte alignment (at least 1byte?)
      //   (seems like some exporters embed fixed 15 or 16bytes?)
      // - 4bytes: magic
      // - 4bytes: version
      // - 120bytes: zero
      // - 16bytes: magic
    if ( reader.size() % 16 === 0 ) {

      return ( ( reader.getOffset() + 160 + 16 ) & ~0xf ) >= reader.size();

    }

    return reader.getOffset() + 160 + 16 >= reader.size();


  },

    /**
     * Parses Node as much compatible as possible with the one parsed by TextParser
     * TODO: could be optimized more?
     * @param {BinaryReader} reader
     * @param {number} version
     * @returns {Object} - Returns an Object as node, or null if NULL-record.
     */
  parseNode( reader, version ) {

      // The first three data sizes depends on version.
    const endOffset = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();
    const numProperties = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();
    const propertyListLen = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();
    const nameLen = reader.getUint8();
    const name = reader.getString( nameLen );

      // Regards this node as NULL-record if endOffset is zero
    if ( endOffset === 0 ) return null;

    const propertyList = [];

    for ( var i = 0; i < numProperties; i++ ) {

      propertyList.push( this.parseProperty( reader ) );

    }

      // Regards the first three elements in propertyList as id, attrName, and attrType
    const id = propertyList.length > 0 ? propertyList[ 0 ] : '';
    const attrName = propertyList.length > 1 ? propertyList[ 1 ] : '';
    const attrType = propertyList.length > 2 ? propertyList[ 2 ] : '';

    const subNodes = {};
    const properties = {};

    let isSingleProperty = false;

      // if this node represents just a single property
      // like (name, 0) set or (name2, [0, 1, 2]) set of {name: 0, name2: [0, 1, 2]}
    if ( numProperties === 1 && reader.getOffset() === endOffset ) {

      isSingleProperty = true;

    }

    while ( endOffset > reader.getOffset() ) {

      const node = this.parseNode( reader, version );

      if ( node === null ) continue;

        // special case: child node is single property
      if ( node.singleProperty === true ) {

        const value = node.propertyList[ 0 ];

        if ( Array.isArray( value ) ) {

            // node represents
            //	Vertices: *3 {
            //		a: 0.01, 0.02, 0.03
            //	}
            // of text format here.

            node.properties[ node.name ] = node.propertyList[ 0 ];
            subNodes[ node.name ] = node;

            switch ( node.name ) {

              case 'Matrix':
              case 'TransformLink':
              case 'Transform':
                node.properties.a = new THREE.Matrix4().fromArray( value );
                break;

              default:
                node.properties.a = value;
                break;

            }


          } else {

            // node represents
            // 	Version: 100
            // of text format here.

            properties[ node.name ] = value;

          }

        continue;

      }

        // special case: connections
      if ( name === 'Connections' && node.name === 'C' ) {

        const array = [];

          // node.propertyList would be like
          // ["OO", 111264976, 144038752, "d|x"] (?, from, to, additional values)
        for ( var i = 1, il = node.propertyList.length; i < il; i++ ) {

            array[ i - 1 ] = node.propertyList[ i ];

          }

        if ( properties.connections === undefined ) {

            properties.connections = [];

          }

        properties.connections.push( array );

        continue;

      }

        // special case: child node is Properties\d+
      if ( node.name.match( /^Properties\d+$/ ) ) {

          // move child node's properties to this node.

        const keys = Object.keys( node.properties );

        for ( var i = 0, il = keys.length; i < il; i++ ) {

            const key = keys[ i ];
            properties[ key ] = node.properties[ key ];

          }

        continue;

      }

        // special case: properties
      if ( name.match( /^Properties\d+$/ ) && node.name === 'P' ) {

        let innerPropName = node.propertyList[ 0 ];
        let innerPropType1 = node.propertyList[ 1 ];
        const innerPropType2 = node.propertyList[ 2 ];
        const innerPropFlag = node.propertyList[ 3 ];
        var innerPropValue;

        if ( innerPropName.indexOf( 'Lcl ' ) === 0 ) innerPropName = innerPropName.replace( 'Lcl ', 'Lcl_' );
        if ( innerPropType1.indexOf( 'Lcl ' ) === 0 ) innerPropType1 = innerPropType1.replace( 'Lcl ', 'Lcl_' );

        if ( innerPropType1 === 'ColorRGB' || innerPropType1 === 'Vector' ||
              innerPropType1 === 'Vector3D' || innerPropType1.indexOf( 'Lcl_' ) === 0 ) {

            innerPropValue = [
              node.propertyList[ 4 ],
              node.propertyList[ 5 ],
              node.propertyList[ 6 ],
            ];

          } else {

            innerPropValue = node.propertyList[ 4 ];

          }

          // this will be copied to parent. see above.
        properties[ innerPropName ] = {

            type: innerPropType1,
            type2: innerPropType2,
            flag: innerPropFlag,
            value: innerPropValue,

          };

        continue;

      }

        // standard case
        // follows TextParser's manner.
      if ( subNodes[ node.name ] === undefined ) {

        if ( typeof node.id === 'number' ) {

            subNodes[ node.name ] = {};
            subNodes[ node.name ][ node.id ] = node;

          } else {

            subNodes[ node.name ] = node;

          }

      } else if ( node.id === '' ) {

          if ( !Array.isArray( subNodes[ node.name ] ) ) {

            subNodes[ node.name ] = [ subNodes[ node.name ] ];

          }

          subNodes[ node.name ].push( node );

        } else if ( subNodes[ node.name ][ node.id ] === undefined ) {

          subNodes[ node.name ][ node.id ] = node;

        } else {

              // conflict id. irregular?

          if ( !Array.isArray( subNodes[ node.name ][ node.id ] ) ) {

            subNodes[ node.name ][ node.id ] = [ subNodes[ node.name ][ node.id ] ];

          }

          subNodes[ node.name ][ node.id ].push( node );

        }

    }

    return {

      singleProperty: isSingleProperty,
      id,
      attrName,
      attrType,
      name,
      properties,
      propertyList, // raw property list, would be used by parent
      subNodes,

    };

  },

  parseProperty( reader ) {

    const type = reader.getChar();

    switch ( type ) {

      case 'C':
        return reader.getBoolean();

      case 'D':
        return reader.getFloat64();

      case 'F':
        return reader.getFloat32();

      case 'I':
        return reader.getInt32();

      case 'L':
        return reader.getInt64();

      case 'R':
        var length = reader.getUint32();
        return reader.getArrayBuffer( length );

      case 'S':
        var length = reader.getUint32();
        return reader.getString( length );

      case 'Y':
        return reader.getInt16();

      case 'b':
      case 'c':
      case 'd':
      case 'f':
      case 'i':
      case 'l':

        var arrayLength = reader.getUint32();
        var encoding = reader.getUint32(); // 0: non-compressed, 1: compressed
        var compressedLength = reader.getUint32();

        if ( encoding === 0 ) {

          switch ( type ) {

              case 'b':
              case 'c':
                return reader.getBooleanArray( arrayLength );

              case 'd':
                return reader.getFloat64Array( arrayLength );

              case 'f':
                return reader.getFloat32Array( arrayLength );

              case 'i':
                return reader.getInt32Array( arrayLength );

              case 'l':
                return reader.getInt64Array( arrayLength );

            }

        }

        if ( window.Zlib === undefined ) {

          throw new Error( 'THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js' );

        }

        var inflate = new Zlib.Inflate( new Uint8Array( reader.getArrayBuffer( compressedLength ) ) ); // eslint-disable-line no-undef
        var reader2 = new BinaryReader( inflate.decompress().buffer );

        switch ( type ) {


          case 'b':
          case 'c':
            return reader2.getBooleanArray( arrayLength );

          case 'd':
            return reader2.getFloat64Array( arrayLength );

          case 'f':
            return reader2.getFloat32Array( arrayLength );

          case 'i':
            return reader2.getInt32Array( arrayLength );

          case 'l':
            return reader2.getInt64Array( arrayLength );

        }

      default:
        throw new Error( 'THREE.FBXLoader: Unknown property type ' + type );

    }

  },

} );


function BinaryReader( buffer, littleEndian ) {

  this.dv = new DataView( buffer );
  this.offset = 0;
  this.littleEndian = ( littleEndian !== undefined ) ? littleEndian : true;

}

Object.assign( BinaryReader.prototype, {

  getOffset() {

    return this.offset;

  },

  size() {

    return this.dv.buffer.byteLength;

  },

  skip( length ) {

    this.offset += length;

  },

    // seems like true/false representation depends on exporter.
    //   true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
    // then sees LSB.
  getBoolean() {

    return ( this.getUint8() & 1 ) === 1;

  },

  getBooleanArray( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getBoolean() );

    }

    return a;

  },

  getInt8() {

    const value = this.dv.getInt8( this.offset );
    this.offset += 1;
    return value;

  },

  getInt8Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getInt8() );

    }

    return a;

  },

  getUint8() {

    const value = this.dv.getUint8( this.offset );
    this.offset += 1;
    return value;

  },

  getUint8Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getUint8() );

    }

    return a;

  },

  getInt16() {

    const value = this.dv.getInt16( this.offset, this.littleEndian );
    this.offset += 2;
    return value;

  },

  getInt16Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getInt16() );

    }

    return a;

  },

  getUint16() {

    const value = this.dv.getUint16( this.offset, this.littleEndian );
    this.offset += 2;
    return value;

  },

  getUint16Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getUint16() );

    }

    return a;

  },

  getInt32() {

    const value = this.dv.getInt32( this.offset, this.littleEndian );
    this.offset += 4;
    return value;

  },

  getInt32Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getInt32() );

    }

    return a;

  },

  getUint32() {

    const value = this.dv.getUint32( this.offset, this.littleEndian );
    this.offset += 4;
    return value;

  },

  getUint32Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getUint32() );

    }

    return a;

  },

    // JavaScript doesn't support 64-bit integer so attempting to calculate by ourselves.
    // 1 << 32 will return 1 so using multiply operation instead here.
    // There'd be a possibility that this method returns wrong value if the value
    // is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
    // TODO: safely handle 64-bit integer
  getInt64() {

    let low, high;

    if ( this.littleEndian ) {

      low = this.getUint32();
      high = this.getUint32();

    } else {

      high = this.getUint32();
      low = this.getUint32();

    }

      // calculate negative value
    if ( high & 0x80000000 ) {

      high = ~high & 0xFFFFFFFF;
      low = ~low & 0xFFFFFFFF;

      if ( low === 0xFFFFFFFF ) high = ( high + 1 ) & 0xFFFFFFFF;

      low = ( low + 1 ) & 0xFFFFFFFF;

      return -( high * 0x100000000 + low );

    }

    return high * 0x100000000 + low;

  },

  getInt64Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getInt64() );

    }

    return a;

  },

    // Note: see getInt64() comment
  getUint64() {

    let low, high;

    if ( this.littleEndian ) {

      low = this.getUint32();
      high = this.getUint32();

    } else {

      high = this.getUint32();
      low = this.getUint32();

    }

    return high * 0x100000000 + low;

  },

  getUint64Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getUint64() );

    }

    return a;

  },

  getFloat32() {

    const value = this.dv.getFloat32( this.offset, this.littleEndian );
    this.offset += 4;
    return value;

  },

  getFloat32Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getFloat32() );

    }

    return a;

  },

  getFloat64() {

    const value = this.dv.getFloat64( this.offset, this.littleEndian );
    this.offset += 8;
    return value;

  },

  getFloat64Array( size ) {

    const a = [];

    for ( let i = 0; i < size; i++ ) {

      a.push( this.getFloat64() );

    }

    return a;

  },

  getArrayBuffer( size ) {

    const value = this.dv.buffer.slice( this.offset, this.offset + size );
    this.offset += size;
    return value;

  },

  getChar() {

    return String.fromCharCode( this.getUint8() );

  },

  getString( size ) {

    let s = '';

    while ( size > 0 ) {

      const value = this.getUint8();
      size--;

      if ( value === 0 ) break;

      s += String.fromCharCode( value );

    }

      // Manage UTF8 encoding
    s = decodeURIComponent( escape( s ) );

    this.skip( size );

    return s;

  },

} );


function FBXTree() {}

Object.assign( FBXTree.prototype, {

  add( key, val ) {

    this[ key ] = val;

  },

  searchConnectionParent( id ) {

    if ( this.__cache_search_connection_parent === undefined ) {

      this.__cache_search_connection_parent = [];

    }

    if ( this.__cache_search_connection_parent[ id ] !== undefined ) {

      return this.__cache_search_connection_parent[ id ];

    }

    this.__cache_search_connection_parent[ id ] = [];


    const conns = this.Connections.properties.connections;

    const results = [];
    for ( let i = 0; i < conns.length; ++i ) {

      if ( conns[ i ][ 0 ] == id ) {

          // 0 means scene root
          const res = conns[ i ][ 1 ] === 0 ? -1 : conns[ i ][ 1 ];
          results.push( res );

        }

    }

    if ( results.length > 0 ) {

      append( this.__cache_search_connection_parent[ id ], results );
      return results;

    }

    this.__cache_search_connection_parent[ id ] = [ -1 ];
    return [ -1 ];


  },

  searchConnectionChildren( id ) {

    if ( this.__cache_search_connection_children === undefined ) {

      this.__cache_search_connection_children = [];

    }

    if ( this.__cache_search_connection_children[ id ] !== undefined ) {

      return this.__cache_search_connection_children[ id ];

    }

    this.__cache_search_connection_children[ id ] = [];


    const conns = this.Connections.properties.connections;

    const res = [];
    for ( let i = 0; i < conns.length; ++i ) {

      if ( conns[ i ][ 1 ] == id ) {

          // 0 means scene root
          res.push( conns[ i ][ 0 ] === 0 ? -1 : conns[ i ][ 0 ] );
          // there may more than one kid, then search to the end

        }

    }

    if ( res.length > 0 ) {

      append( this.__cache_search_connection_children[ id ], res );
      return res;

    }

    this.__cache_search_connection_children[ id ] = [ ];
    return [ ];


  },

  searchConnectionType( id, to ) {

    const key = id + ',' + to; // TODO: to hash
    if ( this.__cache_search_connection_type === undefined ) {

      this.__cache_search_connection_type = {};

    }

    if ( this.__cache_search_connection_type[ key ] !== undefined ) {

      return this.__cache_search_connection_type[ key ];

    }

    this.__cache_search_connection_type[ key ] = '';


    const conns = this.Connections.properties.connections;

    for ( let i = 0; i < conns.length; ++i ) {

      if ( conns[ i ][ 0 ] == id && conns[ i ][ 1 ] == to ) {

          // 0 means scene root
        this.__cache_search_connection_type[ key ] = conns[ i ][ 2 ];
        return conns[ i ][ 2 ];

      }

    }

    this.__cache_search_connection_type[ id ] = null;
    return null;

  },

} );


  /**
   * @param {ArrayBuffer} buffer
   * @returns {boolean}
   */
function isFbxFormatBinary( buffer ) {

  const CORRECT = 'Kaydara FBX Binary  \0';

  return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString( buffer, 0, CORRECT.length );

}

  /**
   * @returns {boolean}
   */
function isFbxFormatASCII( text ) {

  const CORRECT = [ 'K', 'a', 'y', 'd', 'a', 'r', 'a', '\\', 'F', 'B', 'X', '\\', 'B', 'i', 'n', 'a', 'r', 'y', '\\', '\\' ];

  let cursor = 0;

  function read( offset ) {

    const result = text[ offset - 1 ];
    text = text.slice( cursor + offset );
    cursor++;
    return result;

  }

  for ( let i = 0; i < CORRECT.length; ++i ) {

    const num = read( 1 );
    if ( num === CORRECT[ i ] ) {

      return false;

    }

  }

  return true;

}

  /**
   * @returns {number}
   */
function getFbxVersion( text ) {

  const versionRegExp = /FBXVersion: (\d+)/;
  const match = text.match( versionRegExp );
  if ( match ) {

    const version = parseInt( match[ 1 ] );
    return version;

  }
  throw new Error( 'THREE.FBXLoader: Cannot find the version number for the file given.' );

}

  /**
   * Converts FBX ticks into real time seconds.
   * @param {number} time - FBX tick timestamp to convert.
   * @returns {number} - FBX tick in real world time.
   */
function convertFBXTimeToSeconds( time ) {

    // Constant is FBX ticks per second.
  return time / 46186158000;

}

  /**
   * Parses comma separated list of numbers and returns them in an array.
   * If an array is passed just return it - this is because the TextParser sometimes
   * returns strings instead of arrays, while the BinaryParser always returns arrays
   * TODO: this function should only need to be called from inside the TextParser
   * @example
   * // Returns [ 5.6, 9.4, 2.5, 1.4 ]
   * parseNumberArray( "5.6,9.4,2.5,1.4" )
   * @returns {number[]}
   */
function parseNumberArray( value ) {

  if ( Array.isArray( value ) ) return value;

  const array = value.split( ',' );

  for ( let i = 0, l = array.length; i < l; i++ ) {

    array[ i ] = parseFloat( array[ i ] );

  }

  return array;

}

  /**
   * Parses Vector3 property from FBXTree.  Property is given as .value.x, .value.y, etc.
   * @param {FBXVector3} property - Property to parse as Vector3.
   * @returns {THREE.Vector3}
   */
function parseVector3( property ) {

  return new THREE.Vector3().fromArray( property.value );

}

  /**
   * Parses Color property from FBXTree.  Property is given as .value.x, .value.y, etc.
   * @param {FBXVector3} property - Property to parse as Color.
   * @returns {THREE.Color}
   */
function parseColor( property ) {

  return new THREE.Color().fromArray( property.value );

}

  /**
   * Converts ArrayBuffer to String.
   * @param {ArrayBuffer} buffer
   * @param {number} from
   * @param {number} to
   * @returns {String}
   */
function convertArrayBufferToString( buffer, from, to ) {

  if ( from === undefined ) from = 0;
  if ( to === undefined ) to = buffer.byteLength;

  const array = new Uint8Array( buffer, from, to );

  if ( window.TextDecoder !== undefined ) {

    return new TextDecoder().decode( array );

  }

  let s = '';

  for ( let i = 0, il = array.length; i < il; i++ ) {

    s += String.fromCharCode( array[ i ] );

  }

  return s;

}

  /**
   * Converts number from degrees into radians.
   * @param {number} value
   * @returns {number}
   */
function degreeToRadian( value ) {

  return value * DEG2RAD;

}

var DEG2RAD = Math.PI / 180;

  //

function findIndex( array, func ) {

  for ( let i = 0, l = array.length; i < l; i++ ) {

    if ( func( array[ i ] ) ) return i;

  }

  return -1;

}

function append( a, b ) {

  for ( let i = 0, j = a.length, l = b.length; i < l; i++, j++ ) {

    a[ j ] = b[ i ];

  }

}

function slice( a, b, from, to ) {

  for ( let i = from, j = 0; i < to; i++, j++ ) {

    a[ j ] = b[ i ];

  }

  return a;

}
