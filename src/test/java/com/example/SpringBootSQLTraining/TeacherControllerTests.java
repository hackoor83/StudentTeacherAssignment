package com.example.SpringBootSQLTraining;

import com.example.SpringBootSQLTraining.controllers.TeacherController;
import com.example.SpringBootSQLTraining.models.Teacher;
import com.example.SpringBootSQLTraining.repositories.TeacherRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class TeacherControllerTests {

    //First we need an instance of our controller, and we make it private:
    //Then we need to add the annotation @InjectMocks in order to indicate that this controller instance is going to
    //inject the mocks into the real controller in place of whatever is mentioned beneath the @Autowired:
    @InjectMocks
    private TeacherController teacherController;


    //We also need an instance of our Teacher repository:
    //We then indicate that this repository instance is the mock that shall be injected into the controller.
    @Mock
    private TeacherRepository teacherRepository;

    //This is required to make a mock of the whole model (Model View Controller), so it reacts as the server.
    private MockMvc mockMvc;

    //Now we define the function that should run at first, but adding the annotation @Before:
    @Before
    public void setup(){
        //Then we assign the value of our mockMvc (which is a dummy of the server)
        //Note that we are using MockMvcBuilders with "s" plurals.
        //then in the standaloneSetup() method, we should include the instance of our controller.
        mockMvc = MockMvcBuilders.standaloneSetup(teacherController).build();
    }

    //This is a dummy test. This test will confirm on whether everything we wrote above is working successfully.
    //In case this test failed, it means that something wrong above is not working well.
    @Test
    public void dummyTest(){
        assertTrue(true);
    }

    //This is our actual test:
    @Test
    public void testGet() throws Exception{
        List<Teacher> teacherList = new ArrayList<>();

        //Now we need to create a mock object with at least one value in one of its properties.
        //We create an instance of a Teacher.
        Teacher teacher = new Teacher();
        //This instance has a name:
        teacher.setName("Name");
        //and an ID:
        teacher.setId(1L);

        //Then we inject our new Teacher instance to the mock list that we have created.
        teacherList.add(teacher);
        //we can also do this: teacherList.add(new Teacher());

        //Now we intruct the test to return the teacherList (that we have defined in the testGet() method) when
        //the function teacherRepository.findAll() (that is available in the controller) is called.
        when(teacherRepository.findAll()).thenReturn(teacherList);

        //Now to test what we have done:
        //This will perform the get() method through the mentioned url, then it will print everything, and finally,
        //we are expecting the ok status (i.e. the code 200).
        mockMvc.perform(get("/api/teacher"))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$.[0].id", is(1)))
                .andExpect(status().isOk());
    }

}
