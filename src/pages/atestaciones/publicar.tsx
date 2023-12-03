// import { useState } from "react";

// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Stack,
//   Avatar,
//   AvatarBadge,
//   IconButton,
//   Center,
//   Textarea,
//   useToast,
// } from "@chakra-ui/react";
// import { SmallCloseIcon } from "@chakra-ui/icons";

// import { PageWithAppBar } from "~/components/layout/AppBar";
// import ProductCard from "~/components/cards/ProductCard";
// import { FileUploader } from "~/components/fileUploader";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { usePrivy } from "@privy-io/react-auth";
// import { api } from "~/utils/api";
// import { useRouter } from "next/router";
// import ProjectCard from "~/components/cards/ProjectCard";

// const Publicar = () => {
//   const [name, setName] = useState("");
//   const [metric1, setMetric1] = useState("");
//   const [metric2, setMetric2] = useState("");
//   const [metric3, setMetric3] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [project, setProject] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [previewImage, setPreviewImage] = useState<{ preview: string }>();

//   const { user } = usePrivy();

//   const toast = useToast();
//   const { push } = useRouter();

//   //   Get a reference to the storage service, which is used to create references in your storage bucket
//   const storage = getStorage();
//   //   Create a reference to 'username-avatar.jpg'
//   const productImageRef = ref(storage, `products/${user?.id}-avatar.jpg`);

//   const { mutate: createProduct } = api.products.createProduct.useMutation({
//     async onSuccess() {
//       toast({
//         title: "Tu artículo fue publicado exitosamente",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       void push("/marketplace");
//     },
//     onError(err) {
//       toast({
//         status: "error",
//         description: err.message,
//       });
//     },
//   });

//   const handleCreateProduct = () => {
//     if (!user) {
//       toast({
//         status: "error",
//         title: "No autenticado",
//         description: "Debes iniciar sesión",
//       });
//       return;
//     }
//     // createProduct({
//     //   name,
//     //   description,
//     //   image_url: imageUrl,
//     //   quantity,
//     //   price,
//     //   size,
//     //   category,
//     //   brand,
//     //   ownerId: user.id,
//     //   // projectId: "test-id-1241231",
//     // });
//   };

//   return (
//     <PageWithAppBar>
//       <Flex
//         flexDirection="column"
//         justify={"center"}
//         alignItems={"center"}
//         // bg={useColorModeValue("gray.50", "gray.800")}
//         w={"full"}
//         height={"full"}
//         px={8}
//         pt={6}
//         pb={8}
//         gap={6}
//       >
//         <Heading>Publicar Atestación</Heading>
//         <Flex
//           flexDir={["column", null, null, "row"]}
//           gap={[4, null, null, 16]}
//           width={["100%", null, null, "80%"]}
//         >
//           <Stack
//             spacing={4}
//             w={["full", null, null, "50%"]}
//             bg={"brandWhite"}
//             rounded={"xl"}
//             p={4}
//           >
//             <FormControl id="userName">
//               <Stack direction={["column", "row"]} spacing={2}>
//                 <Stack display={["block", null, null, "none"]}>
//                   <ProjectCard
//                     projectCategory={project.category}
//                     projectName={project.name}
//                     projectWebsite={project.website}
//                   />
//                 </Stack>
//                 <Center w="full">
//                   <FileUploader
//                     accept={{ "image/*": [".png", ".jpeg"] }}
//                     multiple={false}
//                     maxSize={10000000}
//                     noDrag={true}
//                     InnerDropzone={
//                       <Button variant="outline" w="full">
//                         Agregar evidencia (imagen)
//                       </Button>
//                     }
//                     onDrop={(acceptedFiles, rejectedFiles) => {
//                       if (rejectedFiles.length > 0) {
//                         rejectedFiles.forEach(({ file, errors }) => {
//                           console.error(file.name, file.size, errors);
//                           errors.map((error) => {
//                             if (error.code === "file-too-large") {
//                               toast({
//                                 title: "File too large",
//                                 status: "error",
//                                 duration: 3000,
//                                 isClosable: true,
//                               });
//                             }
//                             if (error.code === "file-invalid-type") {
//                               toast({
//                                 title: "Invalid file type",
//                                 status: "error",
//                                 duration: 3000,
//                                 isClosable: true,
//                               });
//                             }
//                           });
//                         });
//                       } else {
//                         uploadBytes(productImageRef, acceptedFiles[0]!)
//                           .then((snapshot) => {
//                             return getDownloadURL(snapshot.ref);
//                           })
//                           .then((downloadURL) => {
//                             setImageUrl(downloadURL);
//                             setPreviewImage(() =>
//                               Object.assign(acceptedFiles[0]!, {
//                                 preview: URL.createObjectURL(acceptedFiles[0]!),
//                               })
//                             );
//                           })
//                           .catch((error) => console.error(error));
//                       }
//                     }}
//                   />
//                 </Center>
//               </Stack>
//             </FormControl>
//             <FormControl id="name" isRequired>
//               <FormLabel color={"canvasDark"}>¿Qué artículo es?</FormLabel>
//               <Input
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 color={"canvasDark"}
//                 placeholder="e.g. Playera ETHGlobal, Beanie Base"
//                 _placeholder={{ color: "gray.500" }}
//                 type="text"
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//               />
//             </FormControl>
//             <FormControl id="quantity" isRequired>
//               <FormLabel color={"canvasDark"}>Cantidad</FormLabel>
//               <Input
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 placeholder="Artículos disponibles"
//                 _placeholder={{ color: "gray.500" }}
//                 color={parseFloat(quantity) === 0 ? "gray.500" : "canvasDark"}
//                 type="number"
//                 step={1}
//                 min={1}
//                 value={quantity}
//                 onChange={(event) => setQuantity(event.target.value)}
//               />
//             </FormControl>
//             <FormControl id="price" isRequired>
//               <FormLabel color={"canvasDark"}>Precio</FormLabel>
//               <Input
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 placeholder="Cantidad en ETH"
//                 _placeholder={{ color: "gray.500" }}
//                 color={parseFloat(price) === 0 ? "gray.500" : "canvasDark"}
//                 type="number"
//                 step="0.001"
//                 min={0.001}
//                 value={price}
//                 onChange={(event) => setPrice(event.target.value)}
//               />
//             </FormControl>
//             <FormControl id="size" isRequired>
//               <FormLabel color={"canvasDark"}>Talla</FormLabel>
//               <Input
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 color={"canvasDark"}
//                 placeholder="XS, M, unitalla, 8-10, etc..."
//                 _placeholder={{ color: "gray.500" }}
//                 type="text"
//                 value={size}
//                 onChange={(event) => setSize(event.target.value)}
//               />
//             </FormControl>
//             <FormControl id="description" isRequired>
//               <FormLabel color={"canvasDark"}>Descripción</FormLabel>
//               <Textarea
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 color={"canvasDark"}
//                 placeholder="Talla ajustada, parece CH pero es M..."
//                 _placeholder={{ color: "gray.500" }}
//                 rows={3}
//                 value={description}
//                 onChange={(event) => setDescription(event.target.value)}
//               />
//             </FormControl>
//             <FormControl id="category" isRequired>
//               <FormLabel color={"canvasDark"}>Categoría</FormLabel>
//               <Input
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 color={"canvasDark"}
//                 placeholder="Playera, Tote Bag, Calcetas"
//                 _placeholder={{ color: "gray.500" }}
//                 type="text"
//                 value={category}
//                 onChange={(event) => setCategory(event.target.value)}
//               />
//             </FormControl>
//             <FormControl id="brand" isRequired>
//               <FormLabel color={"canvasDark"}>Marca</FormLabel>
//               <Input
//                 backgroundColor={"white"}
//                 borderColor={"purple.800"}
//                 color={"canvasDark"}
//                 placeholder="Playera, Tote Bag, Calcetas"
//                 _placeholder={{ color: "gray.500" }}
//                 type="text"
//                 value={brand}
//                 onChange={(event) => setBrand(event.target.value)}
//               />
//             </FormControl>
//             <Stack spacing={6} direction={["column", "row"]}>
//               <Button
//                 bg={"transparent"}
//                 borderColor={"primary"}
//                 borderWidth="2px"
//                 color={"canvasDark"}
//                 w="full"
//                 _hover={{
//                   bg: "pink.300",
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button variant="primary" w="full" onClick={handleCreateProduct}>
//                 Publicar
//               </Button>
//             </Stack>
//           </Stack>
//           <Stack
//             spacing={4}
//             w={["full", null, null, "50%"]}
//             bg={"transparent"}
//             rounded={"xl"}
//             p={4}
//             height={"full"}
//             display={["none", null, null, "block"]}
//           >
//             <ProductCard
//               productName={name}
//               productQuantity={quantity}
//               productPrice={price}
//               previewImage={previewImage?.preview}
//             />
//           </Stack>
//         </Flex>
//       </Flex>
//     </PageWithAppBar>
//   );
// };

// export default Publicar;
