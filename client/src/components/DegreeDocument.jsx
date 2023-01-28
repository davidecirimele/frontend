import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
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

const URLSelectDegree = "http://127.0.0.1:8000/api/documents/degree/";
const URLIDCard = "http://127.0.0.1:8000/api/documents/document";

const DegreeDocument = () => {
  const SelectDegreeModal = useDisclosure();
  const DocumentIDModal = useDisclosure();
  const DocumentSelectDepartment = useDisclosure();
  const navigate = useNavigate();

  /* START SELECT DEGREE MODAL (variables, fuctions)*/

  const [degree, setDegree] = useState(""); // Creation of tow useState() to save the selection degree variables
  const [SelectDegree, setSelectDegree] = useState({
    type_of_degree: "",
    university_nation: "",
    year_of_enrollment: "",
    year_of_graduation: "",
    discipline: "",
  });

  const submitDegreeForm = () => {
    // submitDegreeForm is here to send (post) the information tha tthe user put in the text field to the backend and the database
    SelectDegree.type_of_degree = degree;
    const studentFormData = new FormData(); // Creation of a DataForm
    studentFormData.append("type_of_degree", SelectDegree.type_of_degree); // Add information inside
    studentFormData.append("university_nation", SelectDegree.university_nation);
    studentFormData.append(
      "year_of_enrollment",
      SelectDegree.year_of_enrollment
    );
    studentFormData.append(
      "year_of_graduation",
      SelectDegree.year_of_graduation
    );
    studentFormData.append("discipline", SelectDegree.discipline);

    try {
      axios.post(URLSelectDegree, studentFormData).then((response) => {
        // Send information with the url (URLSelectDegree : "http://127.0.0.1:8000/api/documents/degree/" and the studentFormData)
        console.log(response);
      });
    } catch (error) {
      console.log(error);
      setSelectDegree({ status: false });
    }
  };

  const handleDegreeChange = (event) => {
    // HandleDegreeChange is here to modify the variables informations with the informations that the user put
    setDegree(event.target.value);
  };

  const DisplayFieldDegree = (value) => {
    // DisplayFieldDegree is here to display the different field
    if (value !== "") {
      return (
        <Container>
          {" "}
          <Box>
            <Text as="b"> {value}'s University Country</Text>
            <Input
              placeholder="Italy"
              onChange={handleDegreeChange}
              value={SelectDegree.university_nation}
              name="university_nation"
              type="text"
            />
          </Box>
          <Box>
            <Text as="b" children="Year of enrollment" />
            <Input
              placeholder="2024"
              onChange={handleDegreeChange}
              value={SelectDegree.year_of_enrollment}
              name="year_of_enrollment"
            />
          </Box>
          <Box>
            <Text as="b" children="Year of graduation" />
            <Input
              placeholder="2024"
              onChange={handleDegreeChange}
              value={SelectDegree.year_of_graduation}
              name="year_of_graduation"
            />
          </Box>
          <Box>
            <Text as="b" children="Discipline" />
            <Input
              placeholder="Computer Science"
              onChange={handleDegreeChange}
              value={SelectDegree.discipline}
              name="discipline"
            />
          </Box>
        </Container>
      );
    } else {
      return (
        <Text px={1} as="b">
          {" "}
          Select a degree to see all the fields
        </Text>
      );
    }
  };
  /* END SELECT DEGREE MODAL (variables, fuctions)*/
  /* START DOCUMENT ID MODAL (variables, fuctions)*/
  /* This part is the same concept than the DegreeSelect */
  const [IDCardInform, setIDCardInform] = useState({
    name: "",
    surname: "",
    date_of_birth: "",
    place_of_birth: "",
    issuing: "",
  });

  const handleIDCardChange = (event) => {
    setIDCardInform(event.target.value);
  };

  const submitIDCardForm = () => {
    const studentFormIDCard = new FormData();
    studentFormIDCard.append("name", studentFormIDCard.name);
    studentFormIDCard.append("surname", studentFormIDCard.surname);
    studentFormIDCard.append("date_of_birth", studentFormIDCard.date_of_birth);
    studentFormIDCard.append(
      "place_of_birth",
      studentFormIDCard.place_of_birth
    );
    studentFormIDCard.append("issuing", studentFormIDCard.issuing);

    try {
      axios.post(URLIDCard, studentFormIDCard).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayFieldIDCard = () => {
    return (
      <Container>
        {" "}
        <Box>
          <Text as="b"> Your Name </Text>
          <Input
            placeholder="Name"
            onChange={handleIDCardChange}
            value={IDCardInform.name}
            name="name"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Surname" />
          <Input
            placeholder="surname"
            onChange={handleIDCardChange}
            value={IDCardInform.surname}
            name="surname"
            type="text"
          />
        </Box>
        <Box>
          <Text as="b" children="Date of birth" />
          <Input
            placeholder="DD/MM/YYYY"
            onChange={handleIDCardChange}
            value={IDCardInform.date_of_birth}
            name="date_of_birth"
          />
        </Box>
        <Box>
          <Text as="b" children="Place of birth" />
          <Input
            placeholder="Italy"
            onChange={handleIDCardChange}
            value={IDCardInform.place_of_birth}
            name="place_of_birth"
          />
        </Box>
        <Box>
          <Text as="b" children="Issuing" />
          <Input
            placeholder="DD/MM/YYYY"
            onChange={handleIDCardChange}
            value={IDCardInform.issuing}
            name="issuing"
          />
        </Box>
      </Container>
    );
  };
  /* END DOCUMENT ID MODAL (variables, fuctions)*/

  /* START SELECT DEPARMENT MODAL (variables, fuctions)*/
  /* This part is the same concept than the DegreeSelect */
  const [SelectDepartment, setSelectDepartment] = useState([
    { id: 1, label: "Economia", checked: false },
    { id: 2, label: "Economia aziendale", checked: false },
    { id: 3, label: "Media e società digitale", checked: false },
    { id: 4, label: "Scienze dell'amministrazione", checked: false },
    { id: 5, label: "Scienze politiche", checked: false },
    { id: 6, label: "Scienze turistiche", checked: false },
    { id: 7, label: "Servizio sociale", checked: false },
    { id: 8, label: "Comunicazione e dams", checked: false },
    { id: 9, label: "Filosofia e storia", checked: false },
    { id: 10, label: "Lettere e beni culturali", checked: false },
    { id: 11, label: "Lingue e culture moderne", checked: false },
    { id: 12, label: "Mediazione linguistica", checked: false },
    { id: 13, label: "Biologia", checked: false },
    { id: 14, label: "Chimica", checked: false },
    { id: 15, label: "Fisica", checked: false },
    { id: 16, label: "Matematica", checked: false },
    { id: 17, label: "Scienze e tecnologie biologiche", checked: false },
    { id: 18, label: "Scienze geologiche", checked: false },
    { id: 19, label: "Scienze naturali e ambientali", checked: false },
    { id: 20, label: "Informatica", checked: false },
    { id: 21, label: "Ingegneria chimica", checked: false },
    { id: 22, label: "Ingegneria civile", checked: false },
    { id: 23, label: "Ingegneria elettronica", checked: false },
    { id: 24, label: "Ingegneria gestionale", checked: false },
    { id: 25, label: "Ingegneria informatica", checked: false },
    { id: 26, label: "Ingegneria meccanica", checked: false },
    {
      id: 27,
      label: "Ingegneria per l'ambiente e la sicurezza del territorio",
      checked: false,
    },
    { id: 28, label: "Scienza e ingegneria dei materiali", checked: false },
    {
      id: 29,
      label:
        "Informazione scientifica del farmaco e dei prodotti per la salute",
      checked: false,
    },
    { id: 30, label: "Scienza della nutrizione", checked: false },
    { id: 31, label: "Scienze dell'educazione", checked: false },
    {
      id: 32,
      label: "Data science per le strategie aziendali",
      checked: false,
    },
    { id: 33, label: "Economia aziendale e management", checked: false },
    { id: 34, label: "Economia e commercio", checked: false },
    { id: 35, label: "Finance and insurance", checked: false },
    {
      id: 36,
      label: "Scienze delle politiche e dei servizi sociali",
      checked: false,
    },
    {
      id: 37,
      label: "Scienze delle pubbliche amministrazioni",
      checked: false,
    },
    {
      id: 38,
      label: "Scienze politiche e istituzioni comparate",
      checked: false,
    },
    { id: 39, label: "Sociologia, cooperazione e sviluppo", checked: false },
    {
      id: 40,
      label: "Valorizzazione dei sistemi turistico culturali",
      checked: false,
    },
    {
      id: 41,
      label: "Comunicazione e tecnologie dell'informazione",
      checked: false,
    },
    {
      id: 42,
      label:
        "Dams e storia dell'arte. organizzazione e teoria delle arti, della musica e del teatro",
      checked: false,
    },
    { id: 43, label: "Filologia moderna", checked: false },
    {
      id: 44,
      label: "Gestione e conservazione dei documenti digitali",
      checked: false,
    },
    {
      id: 45,
      label:
        "Intelligence per la legalita' e la tutela dei beni culturali e archeologici",
      checked: false,
    },
    { id: 46, label: "Lingue e letterature moderne", checked: false },
    { id: 47, label: "Scienze dell'antichità", checked: false },
    { id: 48, label: "Scienze filosofiche", checked: false },
    { id: 49, label: "Scienze storiche", checked: false },
    { id: 50, label: "Biodiversità e sistemi naturali", checked: false },
    { id: 51, label: "Biologia", checked: false },
    { id: 52, label: "Chemistry", checked: false },
    { id: 53, label: "Mathematics", checked: false },
    { id: 54, label: "Physics", checked: false },
    { id: 55, label: "Scienze geologiche", checked: false },
    {
      id: 56,
      label: "Artificial intelligence and computer science",
      checked: false,
    },
    { id: 57, label: "Ingegneria chimica", checked: false },
    { id: 58, label: "Ingegneria civile", checked: false },
    { id: 59, label: "Ingegneria elettronica", checked: false },
    { id: 60, label: "Ingegneria energetica", checked: false },
    { id: 61, label: "Ingegneria gestionale", checked: false },
    { id: 62, label: "Ingegneria informatica", checked: false },
    { id: 63, label: "Mathematics", checked: false },
    { id: 64, label: "Ingegneria meccanica", checked: false },
    {
      id: 65,
      label: "Ingegneria per l'ambiente e la sicurezza del territorio",
      checked: false,
    },
    { id: 66, label: "Robotics and automation engineering", checked: false },
    {
      id: 67,
      label:
        "Telecommunication engineering: smart sensing, computing and networking",
      checked: false,
    },
    { id: 68, label: "Health biotechnology", checked: false },
    { id: 69, label: "Scienza della nutrizione", checked: false },
    { id: 70, label: "Scienze pedagogiche", checked: false },
    { id: 71, label: "Giurisprudenza", checked: false },
    {
      id: 72,
      label: "Conservazione e restauro dei beni culturali",
      checked: false,
    },
    { id: 73, label: "Ingegneria edile-architettura", checked: false },
    { id: 74, label: "Chimica e tecnologia farmaceutiche", checked: false },
    { id: 75, label: "Farmacia", checked: false },
    { id: 76, label: "Medicina e chirurgia", checked: false },
    { id: 77, label: "Scienze della formazione primaria", checked: false },
  ]);

  const [selectedId, setSelectedId] = useState();

  const handleSelectDepartmentChange = (id) => {
    setSelectedId(id);
    SelectDepartment.map((item) => (item.checked = item.id === id));
    setSelectDepartment([...SelectDepartment]);
  };

  const DisplayFieldSelectDepartment = () => {
    return (
      <Stack overflow="scroll" maxHeight="300px">
        {degree === "Bachelor"
          ? SelectDepartment.slice(0, 31).map((item, index) => (
              <Checkbox
                key={index}
                isChecked={item.checked}
                onChange={() => handleSelectDepartmentChange(item.id)}
              >
                {item.label}
              </Checkbox>
            ))
          : SelectDepartment.slice(31, 77).map((item, index) => (
              <Checkbox
                key={index}
                isChecked={item.checked}
                onChange={() => handleSelectDepartmentChange(item.id)}
              >
                {item.label}
              </Checkbox>
            ))}
      </Stack>
    );
  };
  /* END SELECT DEPARTMENT MODAL (variables, fuctions)*/

  return (
    <ChakraProvider>
      <Center w="100%">
        <Box w="10%"></Box>
        <Box bg="grey" w="100%" p="100px" color="white">
          <Box p="3"></Box>
          <Center>
            <Button
              fontSize="2xl"
              colorScheme="grey"
              onClick={SelectDegreeModal.onOpen}
            >
              Documents
            </Button>
          </Center>
          <Modal
            onClose={SelectDegreeModal.onClose}
            isOpen={SelectDegreeModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <Center>
                <ModalHeader style={{ textAlign: "center" }}>
                  Document
                </ModalHeader>
              </Center>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={10}>
                  <Box>
                    <Text px={1} as="b" children="Select Degree" />
                    <Select
                      placeholder="select degree"
                      onChange={handleDegreeChange}
                      value={degree}
                      id="select_degree"
                    >
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="Doctorate">Doctorate</option>
                    </Select>
                  </Box>
                  {DisplayFieldDegree(degree)}
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (!submitDegreeForm()) {
                      await SelectDegreeModal.onClose();
                      DocumentIDModal.onOpen();
                    }
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button
                  onClick={async () => {
                    SelectDegreeModal.onClose();
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
              <ModalBody>{DisplayFieldIDCard()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (!submitIDCardForm()) {
                      await DocumentIDModal.onClose();
                      DocumentSelectDepartment.onOpen();
                    }
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={DocumentIDModal.onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={DocumentSelectDepartment.onClose}
            isOpen={DocumentSelectDepartment.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                Test able for {degree} degree
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldSelectDepartment()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (!submitIDCardForm()) {
                      await DocumentIDModal.onClose();
                      navigate("/dashboard");
                    }
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={DocumentSelectDepartment.onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Box p="3"></Box>
        </Box>
        <Box w="10%"></Box>
      </Center>
    </ChakraProvider>
  );
};

export default DegreeDocument;
