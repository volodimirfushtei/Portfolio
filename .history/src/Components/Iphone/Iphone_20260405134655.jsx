import { useGLTF } from "@react-three/drei";

export function Iphone(props) {
  const { nodes, materials } = useGLTF("/apple_iphone_13_pro_max.glb");

  const meshes = [
    ["Frame_Frame_0", "Frame"],
    ["Frame_Frame2_0", "Frame2"],
    ["Frame_Port_0", "Port"],
    ["Frame_Antenna_0", "Antenna"],
    ["Frame_Mic_0", "material"],
    ["Body_Mic_0", "material"],
    ["Body_Bezel_0", "Bezel"],
    ["Body_Body_0", "Body"],
    ["Body_Wallpaper_0", "Wallpaper"],
    ["Body_Camera_Glass_0", "Camera_Glass"],
    ["Body_Lens_0", "Lens"],
    ["Body_Material_0", "Material"],
    ["Camera_Body_0", "Body"],
    ["Camera_Glass_0", "Glass"],
    ["Camera_Camera_Frame001_0", "Camera_Frame.001"],
    ["Camera_Mic_0", "material"],
    ["Body001_Screen_Glass_0", "Screen_Glass"],
    ["Button_Frame_0", "Frame"],
    ["Circle003_Frame_0", "Frame"],
    ["Apple_Logo_Logo_0", "Logo"],
    ["Camera001_Body_0", "Body"],
    ["Camera001_Gray_Glass_0", "Gray_Glass"],
    ["Camera001_Flash_0", "Flash"],
    ["Camera001_Port_0", "Port"],
    ["Camera001_Camera_Frame_0", "Camera_Frame"],
    ["Camera001_Camera_Glass_0", "Camera_Glass"],
    ["Camera001_Lens_0", "Lens"],
    ["Camera001_Black_Glass_0", "Black_Glass"],
    ["Camera003_Material002_0", "Material.002"],
  ];

  return (
    <group scale={[2, 2, 2]} {...props}>
      <group scale={0.01}>
        <group scale={100}>
          {meshes.map(([geo, mat]) => (
            <mesh
              key={geo}
              castShadow
              receiveShadow
              geometry={nodes[geo].geometry}
              material={materials[mat]}
            />
          ))}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/apple_iphone_13_pro_max.glb");