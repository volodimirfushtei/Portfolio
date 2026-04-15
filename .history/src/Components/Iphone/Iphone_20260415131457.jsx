import { useGLTF } from "@react-three/drei";
import { memo, useMemo } from "react";

// Оптимізований список мешів з групуванням за матеріалами
const MESH_GROUPS = {
  frame: ["Frame_Frame_0", "Frame_Frame2_0", "Button_Frame_0", "Circle003_Frame_0"],
  body: ["Body_Body_0", "Camera_Body_0", "Camera001_Body_0"],
  glass: ["Body_Screen_Glass_0", "Body_Camera_Glass_0", "Camera001_Gray_Glass_0", "Camera001_Glass_0", "Camera001_Black_Glass_0"],
  camera: ["Camera_Glass_0", "Camera001_Camera_Glass_0", "Camera001_Lens_0", "Body_Lens_0"],
  details: ["Frame_Port_0", "Frame_Antenna_0", "Frame_Mic_0", "Camera_Mic_0", "Camera001_Flash_0", "Camera001_Port_0"],
  materials: ["Body_Mic_0", "Body_Bezel_0", "Body_Wallpaper_0", "Body_Material_0", "Camera_Camera_Frame001_0", "Camera001_Camera_Frame_0"],
  logo: ["Apple_Logo_Logo_0"],
  other: ["Camera003_Material002_0"]
};

// Маппінг матеріалів для швидкого доступу
const MATERIAL_MAP = {
  Frame: "Frame",
  Frame2: "Frame2",
  Port: "Port",
  Antenna: "Antenna",
  Bezel: "Bezel",
  Body: "Body",
  Wallpaper: "Wallpaper",
  Camera_Glass: "Camera_Glass",
  Lens: "Lens",
  Material: "Material",
  Glass: "Glass",
  "Camera_Frame.001": "Camera_Frame.001",
  Screen_Glass: "Screen_Glass",
  Logo: "Logo",
  Gray_Glass: "Gray_Glass",
  Flash: "Flash",
  Camera_Frame: "Camera_Frame",
  Black_Glass: "Black_Glass",
  "Material.002": "Material.002",
  material: "material"
};

// Мемоізований компонент групи мешів
const MeshGroup = memo(({ nodes, materials, meshNames, materialName }) => {
  const geometries = useMemo(() => 
    meshNames.map(name => ({
      name,
      geometry: nodes[name]?.geometry
    })).filter(item => item.geometry),
    [meshNames, nodes]
  );

  if (geometries.length === 0) return null;

  return (
    <>
      {geometries.map(({ name, geometry }) => (
        <mesh
          key={name}
          castShadow
          receiveShadow
          geometry={geometry}
          material={materials[materialName]}
        />
      ))}
    </>
  );
});

MeshGroup.displayName = 'MeshGroup';

// Оптимізований компонент камери
const CameraGroup = memo(({ nodes, materials }) => {
  const cameraMeshes = useMemo(() => [
    { geo: "Camera_Glass_0", mat: "Glass" },
    { geo: "Camera001_Camera_Glass_0", mat: "Camera_Glass" },
    { geo: "Camera001_Lens_0", mat: "Lens" },
    { geo: "Body_Lens_0", mat: "Lens" },
    { geo: "Camera_Body_0", mat: "Body" },
    { geo: "Camera001_Body_0", mat: "Body" },
    { geo: "Camera001_Flash_0", mat: "Flash" },
    { geo: "Camera001_Gray_Glass_0", mat: "Gray_Glass" },
    { geo: "Camera001_Black_Glass_0", mat: "Black_Glass" },
    { geo: "Camera001_Camera_Frame_0", mat: "Camera_Frame" },
    { geo: "Camera_Camera_Frame001_0", mat: "Camera_Frame.001" },
  ], []);

  return (
    <>
      {cameraMeshes.map(({ geo, mat }) => (
        <mesh
          key={geo}
          castShadow
          receiveShadow
          geometry={nodes[geo]?.geometry}
          material={materials[mat]}
        />
      ))}
    </>
  );
});

CameraGroup.displayName = 'CameraGroup';

// Головний компонент
export const Iphone = memo((props) => {
  const { nodes, materials } = useGLTF("/apple_iphone_13_pro_max.glb");

  // Перевірка чи завантажились ресурси
  if (!nodes || !materials) {
    return null;
  }

  return (
    <group scale={[2, 2, 2]} {...props}>
      <group scale={0.01}>
        <group scale={100}>
          {/* Оптимізоване групування мешів */}
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.frame} 
            materialName="Frame" 
          />
          
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.body} 
            materialName="Body" 
          />
          
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.glass} 
            materialName="Glass" 
          />
          
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.details} 
            materialName="material" 
          />
          
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.materials} 
            materialName="Material" 
          />
          
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.logo} 
            materialName="Logo" 
          />
          
          <MeshGroup 
            nodes={nodes} 
            materials={materials} 
            meshNames={MESH_GROUPS.other} 
            materialName="Material.002" 
          />
          
          {/* Окрема група для камери */}
          <CameraGroup nodes={nodes} materials={materials} />
        </group>
      </group>
    </group>
  );
});

Iphone.displayName = 'Iphone';

// Попереднє завантаження моделі з оптимізацією
useGLTF.preload("/apple_iphone_13_pro_max.glb");