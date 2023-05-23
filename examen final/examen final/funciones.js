//CREA VERTICES DE LAS BASES
function poligono(nlados, dim) {
    const vertices = [];
    const ang = 2*Math.PI/nlados;
    radio = dim/2/Math.sin(ang/2);
    for (i=0; i<=nlados; i++) {
        const x = radio*Math.cos(i*ang);
        const y = radio*Math.sin(i*ang);
        vertices.push([x, y]);
    }
    return vertices;
  }
  function poligono3D(dim, nlados, h){
    var vertices = [];
    var vertice2D = poligono(nlados, dim);
    for(i=0; i<=nlados; i++){
        var x = vertice2D[i][0];
        var y = h;
        var z = vertice2D[i][1];
        vertices[i]=[x, y, z];
    }
    return vertices;
  }
  
  function Baseinferior(ver){
    var x = new THREE.Vector3(1, 0, 0);
    var y = new THREE.Vector3(0, 1, 0);
    var z = new THREE.Vector3(0, 0, 1);
    var baseI = new THREE.Geometry();
    var vertices = ver;
    var largovertices = vertices.length;
    for(var i=0; i<largovertices; i++){
        x = vertices[i][0];
        y = 0;
        z = vertices[i][2];
        var vector = new THREE.Vector3(x, y, z);
        baseI.vertices.push(vector);
    }
    return baseI;
  }
  
  //CREA GEOMETRIA DE LAS BASES
  function Basesuperior(ver){
    var x = new THREE.Vector3(1, 0, 0);
    var y = new THREE.Vector3(0, 1, 0);
    var z = new THREE.Vector3(0, 0, 1);
    var baseS = new THREE.Geometry();
    var vertices = ver;
    var largovertices = vertices.length;
    for(var i=0; i<largovertices; i++){
        x = vertices[i][0];
        y = vertices[i][1];
        z = vertices[i][2];
        var vector = new THREE.Vector3(x, y, z);
        baseS.vertices.push(vector);
    }
    return baseS;
  }
  
  //CREA EL POLIEDRO
  function Solido(lado1, lado2, nlados, altura, color){
    var vertices1 = poligono3D(lado1, nlados, altura);
    var vertices2 = poligono3D(lado2, nlados, altura);
    var base1 = Baseinferior(vertices1);
    var base2 = Basesuperior(vertices2);
    var geometria = new THREE.Geometry();
    geometria.merge(base1);
    geometria.merge(base2);
    
    // caras del prisma
    for (var i = 0; i < nlados; i++) {
        geometria.faces.push(new THREE.Face3(i, i+1, i+nlados+1));
        geometria.faces.push(new THREE.Face3(i+1, i+nlados+2, i+nlados+1));
    }
    for (var i = 1; i <= nlados - 2; i++) {
        geometria.faces.push(new THREE.Face3(0, i, i+1));
    }
    var lastIndex = 2 * nlados + 1;
    for (var i = nlados + 1; i <= lastIndex - 2; i++) {
        geometria.faces.push(new THREE.Face3(lastIndex, i+1, i));
    }
    // NORMALES DE LAS CARAS
    geometria.computeFaceNormals();
    geometria.computeVertexNormals();
    
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    var Piramide = new THREE.Mesh(geometria, material);
  
    return Piramide;
  }
