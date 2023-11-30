import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc,onSnapshot, doc, deleteDoc,updateDoc,getDocs  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFtTDjwAyNnanX5UEtufVaVfs1_o89oXQ",
  authDomain: "todoapp-bcff0.firebaseapp.com",
  projectId: "todoapp-bcff0",
  storageBucket: "todoapp-bcff0.appspot.com",
  messagingSenderId: "359555522778",
  appId: "1:359555522778:web:f49bd439134a0fb38045e3",
  measurementId: "G-YM037KBFKY"
};

 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//ADD DATA
window.addtodo = async function () {
  let getinp = document.querySelector('#inp')
  if(getinp.value == ''){
    Swal.fire('You must enter something in the field');
  }
else{
  const docRef = await addDoc(collection(db, "todos"), {
    name: getinp.value,
    time: new Date().toLocaleString()
  });

  console.log("Document written with ID: ", docRef.id);
  getinp.value =' '
}
}
//UPDATE DATA
function getData() {
  let ul = document.querySelector('#ul')
  onSnapshot(collection(db, 'todos'), (data) => {
      data.docChanges().forEach((newData) => {

          if (newData.type == 'removed') {
              let del = document.getElementById(newData.doc.id)
              del.remove()
          }
          else if(newData.type == 'added') {
              //  console.log(newData)
              ul.innerHTML += `
                          <li id=${newData.doc.id}>                       
    ${newData.doc.data().name} <br>
    ${newData.doc.data().time}
    <button id='del-btn' onclick="delTodo('${newData.doc.id}')">remove</button> 
    <button id='edt-btn' onclick="edit(this,'${newData.doc.id} ')">update</button>
    
    </li> `

          }
         

      })
  })
}

getData()
//DELETE ALL
 

let dltalbtn= async() => {
  const colRef = collection(db, 'todos');
  const querySnapshot = await getDocs(colRef);
  const deleteOps = [];
  querySnapshot.forEach((doc) => {
    deleteOps.push(deleteDoc(doc.ref));
  });
  await Promise.all(deleteOps);
};

//DELETE 
async function delTodo(id) {
  await deleteDoc(doc(db, "todos", id));
}

//EDIT
async function edit(e,id) {
  let editval = prompt('Enter Edit value')
    e.parentNode.firstChild.nodeValue = editval
  await updateDoc(doc(db, "todos", id), {
      name: editval,
      time: new Date().toLocaleString()
  });
}


window.getData = getData
window.delTodo = delTodo
window.edit = edit
window.dltalbtn = dltalbtn
