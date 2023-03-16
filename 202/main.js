
function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 200;
    camera.position.y = 150;
    camera.position.z = 300;
    camera.lookAt(scene.position);

    // Colores
    color=[{color:0xFF0000},{color:0x00ff00},{color:0x0000FF}];

    //Geometria para las piramides
    material =[];
    lado=40;
    h=50;
    [v1,v2,v3,v4,v5]=[[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    vertices=[v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];//Secuencia de trazado de vertices
    geom=Geometria(vertices);

    //Materiales para las piramides
    for(i=0;i<3;i++){
        material.push(new THREE.ParticleBasicMaterial(color[i]));
    }
   //Se crean las figuras para las piramides
   fig=[];
   vt=[2*lado,2*lado,0]; // punto de origen
   for(i=0;i<3;i++){
    fig.push(new THREE.Line(geon,material[i]));
    fig[i].applyMatrix(Traslation(vt));
   }

   angulosf = [Math.PI/4,Math.PI/4,Math.PI/3]; //ingresar como angulo x,y ,z
   VectorEscala = [1.5,1.5,1.5] // vector escalado

    //EscaladoReal(fig[1],vt,VectorEscala); //Escala el objeto
    
    //RotacionReal(fig[1],vt,angulosf); //Funcion RotacionReal, aplica matrices en los 3 ejes.
    /*
    SI SE LLAMA DOS FUNCIONES SEGUIDAS SE DAÑA LA TRANSFORMACION, viendo esto se creo una funcion altyer combinando rotacion y escala.
    */

    EjercicioClase(fig[1],vt,angulosf,VectorEscala); // funcion creada para el ejercicio en clase, de esta manera si funciona.
  
     
    
    
    //En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    for(i=0;i<2;i++){
        scene.add(fig[i]);
    }
    
    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;