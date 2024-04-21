[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/sNC2m9MU)
<p align="center">
</p>

# Aplicación Express para coleccionistas de cartas Magic
## Introduccion
El objetivo principal de esta práctica es concebir e implementar un sistema *cliente-servidor* destinado a la gestión de inventario de cartas de Magic: The Gathering. A través de este sistema, los clientes podrán emplear herramientas como **Postman** o **Thunderclient** para enviar peticiones al servidor **HTTP** diseñado con **Express**, encargado de administrar eficazmente las operaciones relacionadas con el inventario.

Desde la adición hasta la eliminación o modificación de cartas, el servidor procesará estas solicitudes de manera eficiente y segura, garantizando una gestión óptima del inventario. En última instancia, el propósito es desarrollar un sistema robusto y escalable que pueda satisfacer las necesidades de gestión de inventario de cartas de Magic: The Gathering, proporcionando a los usuarios una experiencia fluida y eficiente.

## Servidor
El servidor es el encargado de gestionar las peticiones que recibe por parte del cliente. Para ello utilizaremos diferentes metodos entre ellos: GET, POST, DELETE y PATCH, que nos permitiran procesar las peticiones realizadas.

```typescript
app.get('/cards/', (req, res) => {
  const name = req.query.name;
  const id = req.query.id
  const folderPath = join(__dirname, 'cards', name as string);
  if (!id) { // List the cards
    readCards(folderPath, (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    })
  } else {  // Show one cards
    readCard(folderPath, parseInt(id as string), (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    }) 
  }

});

app.post('/cards/', (req, res) => {
  const name = req.query.name;
  console.log(name as string);
  const folderPath = join(__dirname, 'cards', name as string);
  
  const cardData: CardData = req.body;
  writeCard(folderPath, cardData, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  })
});

app.delete('/cards/', (req, res) => {
  const name = req.query.name; 
  const id = req.query.id;
  const folderPath = join(__dirname, 'cards', name as string);
  deleteCard(folderPath, parseInt(id as string), (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  })
})

app.patch('/cards/', (req, res) => {
  const name = req.query.name; 
  const folderPath = join(__dirname, 'cards', name as string);
  const cardData: CardData = req.body;
  updateCard(folderPath, cardData, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  })
})
```

## Funciones para la gestion del inventario
Dado que el servidor es solo el encargado de procesar la informacion hemos dividido las diferentes funcionalidades en archivos diferentes segun su proposito: DELETE, READ, LIST, UPDATE y WRITE

1. DELETE
```typescript
export function deleteCard(filePath :string, id :number, callback :(err :string  | undefined, res :ResponseTypeCard | undefined) => void) {
  FileManager.Instance().removeFromFile(filePath, id, true, (_refuse) => {
    if (_refuse) {
      callback("Error on delete file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'delete',
        refuse: _refuse
      }
      callback(undefined, response); 
    }
  })
}
```

2. READ
```typescript
export function readCard(folderPath :string, id :number, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) :void {
  FileManager.Instance().readFile(folderPath, id, true, (_refuse, _card) => {
    if (_refuse) {
      callback("Error on read file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'show',
        refuse: _refuse,
        card: _card
      }
      callback(undefined, response);
    }
  })
}
```

3. LIST
```typescript
export function readCards(folderPath :string, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) :void {
  FileManager.Instance().readMultipleFiles(folderPath, true, (_refuse, _cards) => {
    if (_refuse) {
      callback("Error on read multiple files", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'list',
        refuse: _refuse,
        cards: _cards
      }
      callback(undefined, response);
    }
  })
}
```

4. UPDATE
```typescript
export function updateCard(folderPath :string, card :CardData, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) :void {
  FileManager.Instance().updateFile(folderPath, card, true, (_refuse) => {
    if (_refuse) {
      callback("Error on update file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'update',
        refuse: _refuse,
      }
      callback(undefined, response);
    }
  })
}
```

5. WRITE
```typescript
export function writeCard(filePath :string, card :CardData, callback :(err :string | undefined, res :ResponseTypeCard | undefined) => void) {
  FileManager.Instance().writeOnFile(filePath, true, card, (_refuse :boolean) => {
    if (_refuse) {
      callback("Error on write file", undefined);
    } else {
      const response :ResponseTypeCard = {
        type: 'add',
        refuse: _refuse,
      }
      callback(undefined, response);
    }
  })
}
```

## Funcionalidades de la aplicacion
La aplicacion cuenta con diferentes funcionalidades:
- GET: Permite mostrar el inventario
- GET: Permite mostrar una carta del inventario
- POST: Permite agregar una carta al inventario de un usuario
- PATCH: Permite actualizar una carta del inventario
- DELETE: Permite eliminar una carta del inventario


## Modificacion realizada en la PE
Se ha solicitado modificar los metodos de la practica anterior para utilizar los metodos Asynchronous del modulo 'fs' haciendo uso de promesas.
```typescript
readPromise = (path :string) => { 
  return new Promise<string | undefined>((resolve, reject) => {
    readFile(path, {encoding: 'utf-8'}).then((data) => {
      resolve(data);
    }).catch((err) => {
      console.error(err);
      reject('Path does not exist.');
    })
  })
}

async readAsync(path :string) :Promise<string | undefined> {
  try {
    const filePath = resolve(path);
    const contents = await readFile(filePath, {encoding: 'utf-8'});
    return contents
  } catch (err) {
    return err;
  }
}

async writeAsync(path :string, cards :Card) :Promise<string | undefined> {
  try {
    const data = new Uint8Array(Buffer.from(cards.getName()))
    await writeFile(path, data);      
    return this.readAsync(path);
  } catch (err) {
    return err;
  }
}
```