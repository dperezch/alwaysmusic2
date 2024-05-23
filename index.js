const {Pool} = require('pg');

const config = {
    host: process.env.HOST,
    database: process.env.DB,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS
}

const pool = new Pool(config)

//1. Agregar un nuevo estudiante.
//  Llamar con el comando:  node --env-file=.env index.js nuevo 'nombre estudiante' 'rut' 'curso' nivel
const insertEstudiante = async () => {
    try {
        const text = 'INSERT INTO estudiantes (nombre, rut , curso , nivel) VALUES ($1, $2, $3,$4) RETURNING *';
        const values = [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])]
        const queryObject = {
            text,
            values,
            rowMode: 'array'
        }
        const result = await pool.query(queryObject);
        console.log(result.rows);
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

//2. Consultar los estudiantes registrados.
//  Llamar con el comando:  node --env-file=.env index.js consulta
const selectEstudiantes =async () => {
    try {
        const text = 'SELECT * FROM estudiantes'
        const queryObject = {
            text,
            rowMode: 'array'
        }
        const result = await pool.query(queryObject);
        console.log("Registro actual ",result.rows);
        
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

//3. Consultar estudiante por rut.
//  Llamar con el comando:  node --env-file=.env index.js rut 'rut'
const selectEstudiante = async () =>{
    try {
        const text = 'SELECT * FROM estudiantes WHERE rut = $1'
        const values = [process.argv[3]]
        const queryObject = {
            text,
            values,
            rowMode: 'array'
        }
        const result = await pool.query(queryObject)
        console.log(result.rows);
        
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

//4. Actualizar la información de un estudiante.
//  Llamar con el comando:  node --env-file=.env index.js editar 'nombre/cambio' 'rut' 'curso/cambio' nivel/cambio
const updateEstudiante = async () => {
    try {
        const text = 'UPDATE estudiantes SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1'
        const values = [process.argv[4], process.argv[3], process.argv[5], process.argv[6]];
        const queryObject = {
            text,
            values,
            rowMode: 'array'
        }
        const result = await pool.query(queryObject)
        console.log("Estudiante " + values[1] + " editado con éxito");
        
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

//5. Eliminar el registro de un estudiante.
//  Llamar con el comando:  node --env-file=.env index.js eliminar 'rut'
const deleteEstudiante = async () => {
    try {
        const text = 'DELETE FROM estudiantes WHERE rut = $1'
        const values = [process.argv[3]]
        const queryObject = {
            text,
            values,
            rowMode: 'array'
        }
        const result = await pool.query(queryObject)
        console.log("Registro de Estudiante con rut " + values + " eliminado con éxito")
        
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

const inpt = process.argv[2];

const funciones = {
    nuevo: insertEstudiante,
    consulta: selectEstudiantes,
    rut: selectEstudiante,
    editar: updateEstudiante,
    eliminar: deleteEstudiante,
}

const ejecutar = async () => {
    funciones[inpt]();
}

ejecutar();

//ejecutar funciones mediante comando
/* switch (inpt) {
    case 'nuevo':
        insertEstudiante()
        break;
    case 'rut':
        selectEstudiante()
        break;
    case 'consulta':
        selectEstudiantes()
        break;
    case 'editar':
        updateEstudiante();
        break;
    case 'eliminar':
        deleteEstudiante();
        break;

    default:
        break;
} */
