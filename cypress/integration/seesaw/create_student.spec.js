const faker = require('faker');

const studentData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    studentOrgId: faker.random.number(),
    orgId: 'org.94961013-f682-41c8-b635-4c117c5b0565',
    fakeOrgId: 'org.xxxxxxxxxxxxxxxxxxxxxxxxx'
}

const schoolAdminData = {
    email: 'qa+ashbyadmin@seesaw.me',
    password: 'qa-take-home',
    adminName: 'Allen Ashby'
}

const BASEURL = 'https://app.seesaw.me/api'

describe('Creation of a Student in the Seesaw Application', function () {

    let userToken = "";
    let studentFullName = "";

    it('Should be able to log in as a school administrator', () => {
        cy.request({
            method: 'POST',
            url: BASEURL + '/auth/login',
            form: true,
            body: {
                email: schoolAdminData.email,
                password: schoolAdminData.password
            }
        }).then((data) => {
            userToken = data.body.response.user_token;
            expect(data.status).to.eq(200);
            expect(data.body.response.person.display_name).to.eq(schoolAdminData.adminName);
        })
    })

    it('Should be able to get a full list of students', () => {
        cy.request({
            method: 'GET',
            url: BASEURL + '/org/student_list_v2',
            auth: {
                bearer: userToken
            },
            qs: {
                org_id: studentData.orgId
            }
        }).then((data) => {
            let studentListTotal = data.body.response.students.length;
            cy.wrap(studentListTotal).should('be.gt', 0);
            expect(data.status).to.eq(200);
        })
    })

    it('Should be able to create a new student', () => {
        cy.request({
            method: 'POST',
            url: BASEURL + '/org/create_org_student',
            auth: {
                bearer: userToken
            },
            qs: {
                org_id: studentData.orgId,
                student_org_id: studentData.studentOrgId,
                first_name: studentData.firstName,
                last_name: studentData.lastName,
                email: studentData.email,
                password: studentData.password
            }
        }).then((data) => {
            studentFullName = studentData.firstName + " " + studentData.lastName;
            expect(data.status).to.eq(200)
            expect(data.body.response.student.display_name).to.eq(studentFullName);
            expect(data.body.response.student.email.toUpperCase()).to.eq(studentData.email.toUpperCase());
        })
    })

    it('Should NOT be able to create a new student if an invalid Org ID is passed', () => {
        cy.request({
            method: 'POST',
            url: BASEURL + '/org/create_org_student',
            auth: {
                bearer: userToken
            },
            qs: {
                org_id: studentData.fakeOrgId,
                student_org_id: studentData.studentOrgId,
                first_name: studentData.firstName,
                last_name: studentData.lastName,
                email: studentData.email,
                password: studentData.password
            },
            failOnStatusCode: false
        }).then((data) => {
            expect(data.status).not.to.eq(200);
            expect(data.status).to.eq(403);
            expect(data.statusText).to.eq('Forbidden');
        })
    })


})