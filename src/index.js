import {firebase, initializeApp} from 'firebase/app'
import {
    getFirestore, collection,onSnapshot,
    addDoc, deleteDoc, doc, query, where,
    orderBy,serverTimestamp, getDoc, updateDoc, getDocs
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged, GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import {
    getStorage,ref
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCVakZV5SJ6qaDy7OIF31_1GyUFS6zvHik",
    authDomain: "tweetbook-45159.firebaseapp.com",
    projectId: "tweetbook-45159",
    storageBucket: "tweetbook-45159.appspot.com",
    messagingSenderId: "557493506479",
    appId: "1:557493506479:web:e93c564a75e10e71c79f5a"
  };

  initializeApp(firebaseConfig)
  const storage= getStorage()
  const storageRef= ref(storage)
const db=getFirestore()
const auth=getAuth()
const provider= new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode='it';
const colRef = collection(db,'users')
if(issignuppage)
{
document.getElementById('signupbtn').addEventListener('click',(e)=>{
    e.preventDefault()
    var namereg=/^[A-Za-z]+$/;
    const email=document.getElementById('signupemail').value
    const password=document.getElementById('signuppassword').value
    const password2=document.getElementById('signuppassword2').value
    const name=document.getElementById('signupname').value
    const user=document.getElementById('signupuser').value
    if(email.length==0 || password.length==0 || password2.length==0 || name.length==0 || user.length==0)
    {
        alert("No field can be empty");
        return;
    }
    if(password!=password2)
    {
        alert("Passwords do not match")
        return;
    }
    if(!name.match(namereg))
    {
        alert("Name cannot contain numbers or be empty");
        return;
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
        addDoc(colRef,{
            user: user,
            name: name,
            email: email
        })
        document.getElementById('signupemail').value='';
        document.getElementById('signuppassword').value='';
        document.getElementById('signuppassword2').value='';
        document.getElementById('signupuser').value='';
        document.getElementById('signupname').value='';
        alert("Account created succesfully");
    })
    .catch((err)=>{
        alert(err.message)
    })
})
document.getElementById('signingoogle').addEventListener('click',(e)=>{
    signInWithPopup(auth,provider)
    .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token=credential.accessToken
        const user=result.user
        console.log(user)
        window.location.replace("./main1.html");
    })
    .catch((error)=>{
        alert(error.message)
        return;
    })
})
}
else if(isloginpage){
document.getElementById('loginbutton').addEventListener('click',(e)=>{
    e.preventDefault()
    const email=document.getElementById('loginemail').value
    const password=document.getElementById('loginpass').value
    signInWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
        alert('Successfully logged in')
        onAuthStateChanged(auth, (user)=>{
            if(user){
                console.log("User signed in")
                // uid=user.uid;
            }
            else
            {
                alert("Error: Please try again")
                return;
            }
        })
        window.location.replace("./main1.html");
    })
    .catch((err)=>{
        alert(err)
    })
})
}
else if(ismainpage)
{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            console.log("User signed in", user.uid)
            // uid=user.uid;
        }
        else
        {
            alert("Error: Please try again")
            return;
        }
    })
}
else if(isprofilepage)
{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            let userdata={}
            const email=user.email
            let name
            const q = query(colRef, where("email","==",email))

            onSnapshot(q,(snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                    profilename.innerText={...doc.data()}.user;
                    document.getElementById("postscount_profile").textContent={...doc.data()}.posts;
                    document.getElementById("followercount_profile").textContent={...doc.data()}.followers;
                    document.getElementById("following_profile").textContent={...doc.data()}.following;
                    document.getElementById("name_profile").textContent={...doc.data()}.name;
                    document.getElementById("about_profile").innerHTML={...doc.data()}.about;
                })
            })
            profilename.innerText=userdata.user;
        }
        else
        {
            alert("Error please try again")
            return;
        }
    })
}