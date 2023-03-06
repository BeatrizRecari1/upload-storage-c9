import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyAoA0rYNghea0O7Cx3AmnhA63KT07sjuBA",
  authDomain: "affirmations-front-end.firebaseapp.com",
  projectId: "affirmations-front-end",
  storageBucket: "affirmations-front-end.appspot.com",
  messagingSenderId: "932785526335",
  appId: "1:932785526335:web:a7437781c07a4668bd4a8a",
};

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    // connect to our bucket
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    // create a reference to our filename in storage
    const filename = selectedFile.name;
    const imageRef = ref(storage, "photo/" + filename);
    // Todd's quick cheat to get the image url
    const url = `https://firebasestorage.googleapis.com/v0/b/affirmations-front-end.appspot.com/o/${filename}?alt=media`;
    // now let's upload
    uploadBytes(imageRef, selectedFile)
      .then(() => setUploadedImage(url))
      .catch(alert);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="*/image"
            name="photo"
            onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
          />
          <button type="submit">Upload</button>
        </form>
      </header>

      {uploadedImage && <img src={uploadedImage} alt="" />}
    </div>
  );
}

export default App;
