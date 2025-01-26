import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


function App() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: 'https://i.imgflip.com/32ij86.jpg'
})

const [allMemes, setAllMemes] = useState([]);

useEffect(() => {
  fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
}, [])

function getNewImage(){
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url

    setMeme(prevMeme => (
        {...prevMeme, 
        imageUrl: newMemeUrl}
    ))
}

function handleChange(event) {
    const {value, name} = event.currentTarget
    setMeme(prevMeme => ({
        ...prevMeme,
        [name]: value
    
    }))
}


  return (
    <>

        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getNewImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} alt='meme-template'/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    </>
  )
}

export default App
