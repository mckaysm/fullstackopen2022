import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios
            .get(baseUrl)
            .then(response => response.data)
}

const addPerson = (person) => {
    return axios
            .post(baseUrl, person)
            .then(response => response.data)
}

const updatePerson = (person) => {
    console.log(person)
    return axios
            .put(`${baseUrl}/${person.id}`, person)
            .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
            .then(response => {
                return response
            })
}

export default {getPersons, addPerson, deletePerson, updatePerson}