import express,{Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import client from './db';
import dataImportRoutes from './routes/dataImportRoutes';
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.use("/data", dataImportRoutes);

app.listen(8000, async ()=>{
    client.connect((err:any)=>{
        if(err) console.log(err);
        else {
            console.log("Connected to supabase postgres db");
            console.log("DV server active on port 8000");
        }
    });
});

