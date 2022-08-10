### 什么是webGL
1. 简单理解为openGL和JS的绑定
2. 光栅化
   1. 把顶点数据转变为片元的过程
   2. 比如，把三角形顶点数据，围城的三个面，用像素填充出来（采样：哪些点该填充，哪些点不该填充）
3. 着色器Share,在GPU上可以执行的一段代码
   1. 顶点着色器
   2. 片元着色器
4. mesh
   1. threeJS： const mesh = new THREE.Mesh(geometry, material);