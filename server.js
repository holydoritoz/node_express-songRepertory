const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, console.log("El servidor esta en ON"));

//MiddleWare
app.use(express.json());

//Get
app.get('/canciones', (req, res)=>{
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    res.json(canciones)
})

//Post
app.post('/canciones', (req, res)=>{
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    canciones.push(cancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones))
    res.send("cancion agregada exitosamente!");    
})

//Put
app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const i = canciones.findIndex(c => c.id == id)
    canciones[i] = cancion
    fs.writeFileSync("canciones.json", JSON.stringify(canciones))
    res.send("Cancion modificada con éxito")
})

//Delete
app.delete("/canciones/:id", (req, res) => {
    const id = req.params.id;
    let canciones = JSON.parse(fs.readFileSync("canciones.json"));
    const cancion = canciones.find((cancion) => cancion.id === id);
    if (!cancion) {
    return res.status(404).json({ message: "Cancion no encontrada" });
    }
    canciones = canciones.filter((cancion) => cancion.id !== id);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send(`Canción: "${cancion}" Eliminada con exito`)    
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})