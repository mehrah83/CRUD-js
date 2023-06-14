let formElem = document.querySelector("#form");
let tableElem = document.getElementById("table");
let formDetails = [];

// Load formDetails from localStorage if available
if (localStorage.getItem("formDetails")) {
  formDetails = JSON.parse(localStorage.getItem("formDetails"));
}

let form = `
  <div class="container my-4">
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your name">
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email id">
      </div>
      <button type="submit" class="btn btn-success" onclick="submitForm()">Submit</button>
    </form>
  </div>`;
formElem.innerHTML = form;

const table = () => {
  let tableHTML = `
    <div class="container my-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
  `; 
  formDetails.forEach((curElem, index) => {
    tableHTML += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${curElem.name}</td>
        <td>${curElem.email}</td>
        <td>
          <button type="button" class="btn btn-warning" onclick="editForm(${index})">Edit</button>
        </td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteForm(${index})">Delete</button>
        </td>
      </tr>`;
  });

  tableHTML += ` 
        </tbody>
      </table>
    </div>`;

  tableElem.innerHTML = tableHTML;
};

const saveToLocalStorage = () => {
  localStorage.setItem("formDetails", JSON.stringify(formDetails));
};

const submitForm = () => {
  let nameElem = document.querySelector("#name");
  let emailElem = document.querySelector("#email");

  const data = {
    name: nameElem.value,
    email: emailElem.value,
  };
  formDetails.push(data);
  table();
  saveToLocalStorage();
  nameElem.value = ""; // Clear the name field
  emailElem.value = ""; // Clear the email field
};

const deleteForm = (index) => {
  formDetails.splice(index, 1);
  table();
  saveToLocalStorage();
};

const editForm = (index) => {
  let edit = `
    <div class="container my-4">
      <form>
        <div class="form-group">
          <label for="newName">Update Name</label>
          <input type="text" value="${formDetails[index].name}" class="form-control" id="newName" placeholder="Enter your updated name">
        </div>
        <div class="form-group">
          <label for="newEmail">Update Email address</label>
          <input type="email"  value="${formDetails[index].email}" class="form-control" id="newEmail" aria-describedby="emailHelp" placeholder="Enter your updated email id">
        </div>
        <button type="submit" class="btn btn-primary" onclick="updateForm(${index})">Update</button>
      </form>
    </div>`;
  formElem.innerHTML = edit;
};

const updateForm = (index) => {
  let newNameElem = document.querySelector("#newName");
  let newEmailElem = document.querySelector("#newEmail");

  formDetails[index] = {
    name: newNameElem.value,
    email: newEmailElem.value,
  };
  table();
  saveToLocalStorage();
  formElem.innerHTML = form;
};

table();
