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
  const SelectCourseToEnrollModal = useDisclosure();
  const navigate = useNavigate();

  

  const submitEnrollStudent = async() => {
    if(selectedCourse != null){
      const getToken = sessionStorage.getItem("token");
      const studentFormData = new FormData(); // Creation of a DataForm
      studentFormData.append("department", selectedCourse.test.department); // Add information inside
      studentFormData.append("course", selectedCourse.test.course_name);
      studentFormData.append("degree_grade", selectedCourse.test.course_grade);
      console.log(studentFormData)

      await axios.post('http://127.0.0.1:8000/api/student_enrolled/', studentFormData,
      {headers: {
        'Authorization': `Token ${getToken}`,
        }
      }).then(result => {
        console.log("success")
        console.log(result.data)
      }).catch(error=>{
        alert("Ci risulta che tu sia già immatricolato, non è possibile immatricolarsi a più di un corso di laurea alla volta")
    }) 
  }
  else
    console.log(selectedCourse);
}
 
  const [bookedTests, setBookedTests] = useState([]);

  async function fetchBookedTests(){
    const getToken = sessionStorage.getItem("token");
      const tests = [];
       await axios.get('http://127.0.0.1:8000/api/booked_test/', {headers: {
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

  function filterTestsByScore(){
    const validTests = [];
    bookedTests.forEach(test => {
      if(!validTests.includes(test) && test.score >= 60)
        validTests.push(test);
    });
    console.log(validTests);
    return validTests;
  }

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSelectTestChange = (course) => {
    setSelectedCourse(course);
  };

  const DisplayFieldEnrollment = () => {
    useEffect(() => {
      fetchBookedTests().then(result => setBookedTests(result));
    }, []);


    if(!filterTestsByScore().isEmpty)
    {
      return (
        <Stack overflow="scroll" maxHeight="300px">
          {filterTestsByScore()?.map((item, index) => (
                <Checkbox
                  key={index}
                  isChecked={item.checked}
                  onChange={() => handleSelectTestChange(item)}
                >
                  {item.test.course_name}
                </Checkbox>
              ))}
        </Stack>
      );
    }
    else{
      return (
        <Text px={1} as="b">
          {" "}
          No available courses to enroll
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
              onClick={SelectCourseToEnrollModal.onOpen}
            >
              Enroll
            </Button>
          </Center>
          <Modal
            onClose={SelectCourseToEnrollModal.onClose}
            isOpen={SelectCourseToEnrollModal.isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textAlign: "center" }}>
                Courses able to enroll
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>{DisplayFieldEnrollment()}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                  if(!submitEnrollStudent()){
                    SelectCourseToEnrollModal.onClose();
                  }
                  }
                }
                >
                  {" "}
                  Next{" "}
                </Button>
                <Box p="3"></Box>
                <Button onClick={async () => {
                  SelectCourseToEnrollModal.onClose()
                  window.location.reload(false);}
                }>Close</Button>
                  
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
