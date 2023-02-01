import { ChakraProvider } from "@chakra-ui/react";
import React, { useState,useEffect } from "react";
import {
  Box,
  Center,
  Input,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stack,
  Select,
  Container,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnrollStudent = () => {
  const DocumentIDModal = useDisclosure();
  const navigate = useNavigate();

  const [iddocument, setIDDocument] = useState([])
  const [IDCardInform, setIDCardInform] = useState({
    id_number: "",
    type: "",
    country_of_issue: "",
    date_of_issue: "",
    date_of_expiration: "",
    authority_issuing_the_document: "",
    document_img: null,
  });

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
          setFileUrl(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
  }
  }

  async function fetchIDDocument(){
    const getToken = sessionStorage.getItem("token");
      const documents = [];
       await axios.get('http://127.0.0.1:8000/api/document/', {headers: {
        'Authorization': `Token ${getToken}`,
        },
      }).then(result => {
      console.log(result.data);
      result.data.forEach(document => {
        documents.push(document);
      });
      })
      return documents;
  }

  function checkIdDocument(){
    return iddocument.length > 0;
  }

  const handleIDCardChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name,value)
    setIDCardInform(values => ({...values, [name]: value}));
  };

  const submitIDCardForm = async() => {
    if(IDDocumentisValid())
    {
        const getToken = sessionStorage.getItem("token");

        const formData = new FormData();
        formData.append('document_img', file);
        formData.append('id_number', IDCardInform.id_number);
        formData.append('type', IDCardInform.type);
        formData.append('country_of_issue', IDCardInform.country_of_issue);
        formData.append('date_of_issue', IDCardInform.date_of_issue);
        formData.append('date_of_expiration', IDCardInform.date_of_expiration);
        formData.append('authority_issuing_the_document', IDCardInform.authority_issuing_the_document);
        
        await axios.post('http://127.0.0.1:8000/api/document/', 
        formData, {headers: {
          'Authorization': `Token ${getToken}`,
          },
      }).then(result => {
        alert('Documento inserito con successo!')
      })
      .catch(error => {
        alert('Per favore, inserisci tutti i dati');
      })
    }
  }

  function IDDocumentisValid(){
    return IDCardInform.id_number != "" && IDCardInform.country_of_issue != "" && IDCardInform.date_of_issue != "" && IDCardInform.date_of_expiration != "" && IDCardInform.type != "";
  }

  const DisplayIDDocumentForm = () => {
    useEffect(() => {
      fetchIDDocument().then(result => setIDDocument(result));
    }, []);

    if(!checkIdDocument())
    {
      return (
      <Container>
        {" "}
        <Box>
          <Text as="b"> ID Number </Text>
          <Input
            placeholder="ID number"
            onChange={handleIDCardChange}
            value={IDCardInform.id_number}
            name="id_number"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Type" />
          <Input
            placeholder="Type"
            onChange={handleIDCardChange}
            value={IDCardInform.type}
            name="type"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Country of issue" />
          <Input
            placeholder="Country of issue"
            onChange={handleIDCardChange}
            value={IDCardInform.country_of_issue}
            name="country_of_issue"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Date of issue" />
          <Input
            placeholder="YYYY-MM-DD"
            onChange={handleIDCardChange}
            value={IDCardInform.date_of_issue}
            name="date_of_issue"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Date of expiratione" />
          <Input
            placeholder="YYYY-MM-DD"
            onChange={handleIDCardChange}
            value={IDCardInform.date_of_expiration}
            name="date_of_expiration"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Authority issuing the Document" />
          <Input
            placeholder="Authority issuing the document"
            onChange={handleIDCardChange}
            value={IDCardInform.authority_issuing_the_document}
            name="authority_issuing_the_document"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Upload Document (jpeg, png)" />
          <Input
            type="file" 
            name="document_img" 
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            value={IDCardInform.document_img}
          />
        </Box>
      </Container>
    );
    }
    else{
      return (
        <Text px={1} as="b">
          {" "}
          Your Document ID is already uploaded!
        </Text>
      );
    }
  };

  return (

    <ChakraProvider>
      <Center w="100%">
        <Box w="10%"></Box>
          <Box p="3"></Box>
          <Center>
            <Button
              colorScheme="grey"
              onClick={DocumentIDModal.onOpen}
            >
              Upload ID Document
            </Button>
          </Center>
          <Modal
            onClose={DocumentIDModal.onClose}
            isOpen={DocumentIDModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                ID Card Information
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayIDDocumentForm()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (checkIdDocument()) {
                      DocumentIDModal.onClose();
                      window.location.reload(false);
                    }
                    else
                    {
                      submitIDCardForm();
                      if(IDDocumentisValid()){
                        DocumentIDModal.onClose();
                        window.location.reload(false);
                    }   
                    }
                    
                  }}
                >
                  {" "}
                  Ok{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={DocumentIDModal.onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>          
          <Box p="3"></Box>
        <Box w="10%"></Box>
      </Center>
    </ChakraProvider>
  );
};

export default EnrollStudent;
