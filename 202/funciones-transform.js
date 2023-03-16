/**
 * Geometria: Crea un objeto THREE.Geometry y lo retorna 
 * ENTRADAS:  vx= Arreglos de vertices (Arreglos de arregos de enteros )
 * SALIDAS: geon= objeto THREE.Geometry generado a paritr de arreglo vx
 */
function Geometria(vx){
    geon= new THREE.Geometry();
    for (let i = 0; i < vx.length; ++i) {
        x = vx[i][0];
        y = vx[i][1];
        z = vx[i][2];
        vector = new THREE.Vector3(x, y, z);
        geon.vertices.push(vector);
    }
    return geon;

}  
/**
 * Traslacion: crea la matriz de traslacion a partir del vector vt
 * ENTRADAS: vt: vector de traslacion (arreglo de traslacion)
 * SALIDAS: matriz = MAtriz de translacion generada a partir de vt 
 */
function Traslation(vt) {
    var matriz = new THREE.Matrix4();
    matriz.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
    return matriz;
}
/**
 * Escalado: crea la matriz de escalado a partir del vector vs
 * ENTRADAS: vs: vector de escalado (arreglo de escalado)
 * SALIDAS: matriz = MatrizS de translacion generada a partir de vs
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
    return matrizS;
}

/**
 * Rotacion: crea matrices de rotacion a partir de vector angulito
 * ENTRADAS: angulito: arreglo con angulo en x,y,z
 * SALIDAS: matriz = MatrizRx, MatrixRy, MatrizRz. matrices rotadas en el orden x,y,z.
 */

function Rotacion(angulitos) {

    var matrizRx = new THREE.Matrix4();
    var alpha = angulitos[0];
    var csx = Math.cos(alpha);
    var ssx = Math.sin(alpha);

    matrizRx.set(1,  0, 0, 0, //rotacion en x 
                0,  csx, -ssx, 0, 
                0, ssx, csx, 0,
                0, 0, 0, 1);


    var matrizRy = new THREE.Matrix4();
    var theta = angulitos[1];
    var csy = Math.cos(theta);
    var ssy = Math.sin(theta);

    matrizRy.set(csy,  0, ssy, 0, //rotacion en y
                0,  1, 0, 0, 
                -ssy, 0, csy, 0,
                0, 0, 0, 1);

    var matrizRz = new THREE.Matrix4();
    var beta = angulitos[2];
    var csz = Math.cos(beta);
    var ssz = Math.sin(beta);

    matrizRz.set(csz,  -ssz, 0, 0, //rotacion en z
                ssz,  csz, 0, 0, 
                0, 0, 1, 0,
                0, 0, 0, 1);
    
    
    matrixResultado = new THREE.Matrix4();

    matrixResultado.set(1,  0, 0, 0, //matris identidad
                        0,  1, 0, 0, 
                        0, 0, 1, 0,
                        0, 0, 0, 1);

    matrixResultado.multiply(matrizRx);
    matrixResultado.multiply(matrizRy);
    matrixResultado.multiply(matrizRz);


        return  matrixResultado
        

}

/**
 * Rotacion real:rotacion en los 3 ejes y traslado 
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser rotado, angulitos = vector angulos en x,y,z,vp=(posicion inicial)
 * SALIDA: obj Actializado 
 */
function RotacionReal(obj,vp,angulitos){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Rotacion(angulitos));//Escalado del obj
    obj.applyMatrix(Traslation(vp));// Tranlacion al punto inicial 

}

/**
 * Ejercicio en clase:rotacion en los 3 ejes y vector traslado, vector escalado
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser rotado, angulitos = vector angulos en x,y,z,vp=(posicion inicial)
 * SALIDA: obj Actializado escalado y rotado.
 */

function EjercicioClase(obj,vp,angulitos,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); //Traslacion origen
    obj.applyMatrix(Escalado(vs));//Escalado del obj
    obj.applyMatrix(Rotacion(angulitos));//Escalado del obj
    obj.applyMatrix(Traslation(vp));// Tranlacion al punto inicial 

}


/**
 * Escalado real: escala y traslada
 * ENTRADA: OBJETO: Objeto tipo THREE.line a ser escaldado, vs=(Vectores escalado),vp=(posicion inicial)
 * SALIDA: obj Actializado 
 */
function EscaladoReal(obj,vp,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Translacion al puto de origen [0,0,0]
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Escalado(vs));//Escalado del obj
    obj.applyMatrix(Traslation(vp));// Tranlacion al punto inicial 

}


