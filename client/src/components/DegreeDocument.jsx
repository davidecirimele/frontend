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

const URLSelectDegree = "http://127.0.0.1:8000/api/degree/";
const URLIDCard = "http://127.0.0.1:8000/api/document/";

const DegreeDocument = () => {
  const SelectDegreeModal = useDisclosure();
  const DiplomaModal = useDisclosure();
  const BachelorModal = useDisclosure();
  const MasterModal = useDisclosure();
  const DocumentIDModal = useDisclosure();
  const DocumentSelectDepartment = useDisclosure();
  const TestSelectionModal = useDisclosure();
  const navigate = useNavigate();

  /* START SELECT DEGREE MODAL (variables, fuctions)*/

  const [course_grade, setGrade] = useState('');
  const [SelectDegree, setSelectDegree] = useState({
    type_of_degree: "",
    university_nation: "",
    year_of_enrollment: "",
    year_of_graduation: "",
    discipline: "",
  });
  


  const handleChoice = (e) => {
    setGrade(e.target.value);
  }

  function setGradeChoice(){
    const getToken = sessionStorage.getItem("token");
        
      axios.post('http://127.0.0.1:8000/api/studentchoice/', {
        course_grade: course_grade,
      },{headers: {
        'Authorization': `Token ${getToken}`
        }
      }).then(result => {
        console.log(result.data);
        return true;
      })
        .catch(error => {
          alert(error);
        })
        return false;
  }

  const submitDegreeForm = async(type) => {
    const getToken = sessionStorage.getItem("token");
    // submitDegreeForm is here to send (post) the information tha tthe user put in the text field to the backend and the database
    const studentFormData = new FormData(); // Creation of a DataForm
    studentFormData.append("type_of_degree", type); // Add information inside
    studentFormData.append("university_nation", SelectDegree.university_nation);
    studentFormData.append("year_of_enrollment",SelectDegree.year_of_enrollment);
    studentFormData.append("year_of_graduation",SelectDegree.year_of_graduation);
    studentFormData.append("discipline", SelectDegree.discipline);
    console.log(studentFormData)

    await axios.post('http://127.0.0.1:8000/api/degree/', studentFormData,
    {headers: {
      'Authorization': `Token ${getToken}`,
      }
    }).then(result => {
      console.log(result.data)
    }).catch(error=>{
      alert(error)
    
    setSelectDegree({ status: false });
  })
}

async function fetchDocumentation(){
  const getToken = sessionStorage.getItem("token");
    const degrees = [];
     await axios.get('http://127.0.0.1:8000/api/degree/', {headers: {
      'Authorization': `Token ${getToken}`,
      },
    }).then(result => {
    console.log(result.data);
    result.data.forEach(degree => {
      degrees.push(degree);
    });
    })
    console.log(degrees)
    return degrees;
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

const [documentation, setDocumentation] = useState([]);
const [iddocument, setIdDocument] = useState([]);

function checkDocumentation(type){
  var found = false;
  documentation.forEach(document => {
    if(document.type_of_degree === type){
      console.log(document.type_of_degree)
      found = true;
    }
  });
  return found;
}

function checkIdDocument(){
  return iddocument.length > 0;
}



  const handleFormChange = (event) => {
    // HandleDegreeChange is here to modify the variables informations with the informations that the user put
    const name = event.target.name;
    const value = event.target.value;
    console.log(name,value)
    setSelectDegree(values => ({...values, [name]: value}))
  };

  const DisplayFieldDiploma = () => {
    
    useEffect(() => {
      fetchDocumentation().then(result => setDocumentation(result));
      console.log(documentation);
    }, []);
  
    console.log(checkDocumentation("Diploma"))
      if(!checkDocumentation("Diploma"))
      {
        return (
          <Container>
            {"Please Insert High School Diploma"}
            <Box>
              <Text as="b"> High School Country</Text>
              <Input
                placeholder="Italy"
                onChange={handleFormChange}
                value={SelectDegree.university_nation || ""}
                name="university_nation"
                type="text"
              />
            </Box>
            <Box>
              <Text as="b" children="Year of enrollment" />
              <Input
                placeholder="2024"
                onChange={handleFormChange}
                value={SelectDegree.year_of_enrollment || ""}
                name="year_of_enrollment"
              />
            </Box>
            <Box>
              <Text as="b" children="Year of graduation" />
              <Input
                placeholder="2024"
                onChange={handleFormChange}
                value={SelectDegree.year_of_graduation || ""}
                name="year_of_graduation"
              />
            </Box>
            <Box>
              <Text as="b" children="Discipline" />
              <Input
                placeholder="Computer Science"
                onChange={handleFormChange}
                value={SelectDegree.discipline || ""}
                name="discipline"
              />
            </Box>
          </Container>
        );
      }
      else {
        return (
          <Text px={1} as="b">
            {" "}
            Your Diploma is already uploaded, click Next
          </Text>
        );
      }
    
  };


  const DisplayFieldDegree = (value) => {
    
    useEffect(() => {
      fetchDocumentation().then(result => setDocumentation(result));
      console.log(documentation);
    }, []);

    if(!checkDocumentation(value)){
        return (
          <Container>
            {"Please Insert a "+value+" degree data"}
            <Box>
              <Text as="b"> University Country</Text>
              <Input
                placeholder="Italy"
                onChange={handleFormChange}
                value={SelectDegree.university_nation || ""}
                name="university_nation"
                type="text"
              />
            </Box>
            <Box>
              <Text as="b" children="Year of enrollment" />
              <Input
                placeholder="2024"
                onChange={handleFormChange}
                value={SelectDegree.year_of_enrollment || ""}
                name="year_of_enrollment"
              />
            </Box>
            <Box>
              <Text as="b" children="Year of graduation" />
              <Input
                placeholder="2024"
                onChange={handleFormChange}
                value={SelectDegree.year_of_graduation || ""}
                name="year_of_graduation"
              />
            </Box>
            <Box>
              <Text as="b" children="Discipline" />
              <Input
                placeholder="Computer Science"
                onChange={handleFormChange}
                value={SelectDegree.discipline || ""}
                name="discipline"
              />
            </Box>
          </Container>
        );
    }
    else{
      return (
        <Text px={1} as="b">
          {" "}
          Your {value} is already uploaded, click Next
        </Text>
      );
    }
      
  };
  /* END SELECT DEGREE MODAL (variables, fuctions)*/
  /* START DOCUMENT ID MODAL (variables, fuctions)*/
  /* This part is the same concept than the DegreeSelect */
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

  const handleIDCardChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name,value)
    setIDCardInform(values => ({...values, [name]: value}));
  };

  const submitIDCardForm = async() => {

    try{

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
      console.log(result.data)
    }) 
  }
  catch(error){
    console.log(error)
  }
  }

  const DisplayFieldIDCard = () => {
    useEffect(() => {
      fetchIDDocument().then(result => setIdDocument(result));
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
          Your Document ID is already uploaded, click Next
        </Text>
      );
    }
  };
  /* END DOCUMENT ID MODAL (variables, fuctions)*/

  /* START SELECT DEPARMENT MODAL (variables, fuctions)*/
  /* This part is the same concept than the DegreeSelect */
  const [SelectDepartment, setSelectDepartment] = useState([]);

  async function fetchDepartmentsTests(){
    const getToken = sessionStorage.getItem("token");
      const tests = [];
       await axios.get('http://127.0.0.1:8000/api/test/', {headers: {
        'Authorization': `Token ${getToken}`,
        },
      }).then(result => {
      console.log(result.data);
      result.data.forEach(test => {
        tests.push(test);
      });
      })
      console.log(tests)
      return tests;
  }

  async function submitBookedTest(){
    const getToken = sessionStorage.getItem("token");
    
      await axios.post('http://127.0.0.1:8000/api/booked_test/',{
        test_id: selectedTest.test_id,
        test: selectedTest.test_id,
        score: 0,
      }, {headers: {
        'Authorization': `Token ${getToken}`,
        },
      
      }).then(result => {
      console.log(result);
      }).catch(error=>{
        console.log(error);
      });
  }

  function filterTestsByName(value){
    const validTests = [];
    SelectDepartment.forEach(test => {
      if(!validTests.includes(test) && test.course_grade === value)
        validTests.push(test);
    });
    return validTests;
  }

  function filterTestsByDate(value){
    const validDates = [];
    SelectDepartment.forEach(test => {
      if(test.course_name === value)
        validDates.push(test);
    });
    return validDates;
  }

  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedTest, setSelectedTest] = useState(null);

  const handleSelectDepartmentChange = (name) => {
    setSelectedCourse(name);
  };

  const handleSelectTestChange = (test) => {
    setSelectedTest(test);
  };

  const DisplayFieldSelectDepartment = () => {
    useEffect(() => {
      fetchDepartmentsTests().then(result => setSelectDepartment(result));
    }, []);

    return (
      <Stack overflow="scroll" maxHeight="300px">
        {filterTestsByName(course_grade)?.map((item, index) => (
              <Checkbox
                key={index}
                isChecked={item.checked}
                onChange={() => handleSelectDepartmentChange(item.course_name)}
              >
                {item.course_name}
              </Checkbox>
            ))}
      </Stack>
    );
  };

  const DisplayFieldSelectedTest = () => {

    return (
      <Stack overflow="scroll" maxHeight="300px">
        {filterTestsByDate(selectedCourse)?.map((item, index) => (
              <Checkbox
                key={index}
                isChecked={item.checked}
                onChange={() => handleSelectTestChange(item)}
              >
                {item.course_name+",data:"+new Date(item.date_time).getDay()+"/"+new Date(item.date_time).getMonth()+"/"+new Date(item.date_time).getFullYear()+" ,ora: "+new Date(item.date_time).getHours()+":"+new Date(item.date_time).getMinutes()}
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
          <Box p="3"></Box>
          <Center>
            <Button
              colorScheme="grey"
              onClick={SelectDegreeModal.onOpen}
            >
              Book a test
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
                  Degree
                </ModalHeader>
              </Center>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={10}>
                  <Box>
                    <Text px={1} as="b" children="Select Degree" />
                    <Select
                      placeholder="select degree"
                      onChange={handleChoice}
                      value={course_grade}
                      id="select_degree"
                    >
                      <option value="Bachelor">Bachelor</option>
                      <option value="Master">Master</option>
                      <option value="Doctorate">Doctorate</option>
                    </Select>
                  </Box>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (!setGradeChoice()) {
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
                    window.location.reload(false);
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
                    if (submitIDCardForm()) {
                      await DocumentIDModal.onClose();
                      DiplomaModal.onOpen();
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
                Test able for {course_grade} degree
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldSelectDepartment()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                  DocumentSelectDepartment.onClose();
                  TestSelectionModal.onOpen();
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={async () => {
                  DocumentSelectDepartment.onClose()
                  window.location.reload(false);}
                }>Close</Button>
                  
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={TestSelectionModal.onClose}
            isOpen={TestSelectionModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                Available dates for {selectedCourse}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldSelectedTest()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (submitBookedTest()) {
                      await TestSelectionModal.onClose();
                    }
                    window.location.reload(false);
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={async () => {
                  DocumentSelectDepartment.onClose()
                  window.location.reload(false);}
                }>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={DiplomaModal.onClose}
            isOpen={DiplomaModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                Diploma Information
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldDiploma()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (checkDocumentation("Diploma") || submitDegreeForm("Diploma")) {
                      await DiplomaModal.onClose();
                      if(course_grade == "Bachelor")
                        DocumentSelectDepartment.onOpen();
                      else
                        BachelorModal.onOpen();
                    }
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={DiplomaModal.onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={BachelorModal.onClose}
            isOpen={BachelorModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                Bachelor's Degree Information
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldDegree("Bachelor")}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (checkDocumentation("Bachelor") || submitDegreeForm("Bachelor")) {
                      await BachelorModal.onClose();
                      if(course_grade == "Doctorate")
                        MasterModal.onOpen();
                      else
                        DocumentSelectDepartment.onOpen();
                    }
                  }}
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={BachelorModal.onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            onClose={MasterModal.onClose}
            isOpen={MasterModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                Master's Degree Information
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldDegree("Master")}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    if (checkDocumentation("Master") || submitDegreeForm("Master")) {
                      await MasterModal.onClose();
                      DocumentSelectDepartment.onOpen();
                    }
                    window.location.reload(false);
                  }}
                  
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={MasterModal.onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          
          <Box p="3"></Box>
        <Box w="10%"></Box>
      </Center>
    </ChakraProvider>
  );
};

export default DegreeDocument;
