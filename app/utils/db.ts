import mongoose from 'mongoose';


const dbConnect = async () => {
    if (!process.env.DB_URL) {
        console.error('Falta la variable de entorno DB_URL.');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.DB_URL);

        const { name, host } = db.connection;
        console.log(`DB name: ${name} || Server: ${host}`);
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
    }
};

export { dbConnect };
