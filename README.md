# 🚀  Dark Store 
    This project was created MERN STAK( Mongo, Express, React, and NodeJS) for a Dark Store.

    A "Dark Store" is a retail facility closed to the public, exclusively used for online order 
    fulfillment. Employees pick and pack products for online orders, optimizing efficiency 
    in the e-commerce supply chain.

## 👉 Instructions to Run it on Your Local Machine
​
To have a version on you local machine:
- Clone this repository.
- Open a terminal on the containing folder of this project.
- Install all the dependencies.

## 🔨 Backend
### List of endpoints:
- Create: POST https://localhost/api/products
- List: GET https://localhost/api/products
- OneList: GET https://localhost/api/products/:id
- DeleteOne: DELETE https://localhost/api/products/:id
- Update: PUT https://localhost/api/products/:id
- UploadImage: POST https://localhost/api/upload_image/:id
- ListImage: GET https://localhost/api/image/:file
- Search: GET https://localhost/api/search/:search

## ✒️ Frontend
![screenshot](./main.png)

## 💻 Deployment
### With Docker
#### MongoDb: Navigate to mongo/Dockerfile
Run:
> docker build -t my-mongo-image .
    
> docker run -d -p 27017:27017 --name mongodb my-mongo-image

#### Backend: Navigate to api-rest-dark-store

Run: 
> docker build -t api-rest-dark-store .

> docker run --name node-app-container -p 8080:443 api-rest-dark-store

### With Local 
#### Install Mongo and Mongo DB Compas.

#### Backend: Navigate to api-rest-dark-store
> npm install

> npm run start

#### UnitTest

> npm test

#### Frontend: Navigate to dark-store-app
> npm isntall

> npm run dev

## Author 

## 🎨 **Jasem Valencia**

- Github: [@JasemDuncan](https://github.com/JasemDuncan)
- Twitter: [@JasemValencia](https://twitter.com/JasemValencia)
- Linkedin: [@JasemDuncan](www.linkedin.com/in/Jasem-Duncan-Valencia)

## 🤝 Contributing

    Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/JasemDuncan/Scharff/issues).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License
This project is [MIT](lic.url) licensed.
This project is for Educational purposes.