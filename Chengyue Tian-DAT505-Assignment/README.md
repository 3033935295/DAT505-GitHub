# DAT505-GitHub
## Assignment Link: https://github.com/3033935295/DAT505-GitHub
### Name：TIAN,CHENGYUE
### Student number:B161006085
![Alt text](https://github.com/3033935295/DAT505-GitHub/blob/master/image/17.png)
## Final Project
### There is a map of china in this project.And when you click on the map, the corresponding provincial GPD will be displayed. And you can rotate the geometry by your mouse.

## source of ideals
### I think data visualization is better to emerge.At the same time, I see a example which is a map in the three.js.So I want to combine both of them.  

## structure

### The folder "js" contains a folder named "img",two jsons named "china" and "chinaGDP".The folder contains two textures used in the project to perform the height of the GDP of each province.And the "china" is the coordinates of china's map.The "chinaGDP" is the data that GDP of each province.

## code

![Alt text](https://github.com/3033935295/DAT505-GitHub/blob/master/image/18.png)
### The GDP data is from the Official Website of the National Bureau of Statistics of China (http://www.stats.gov.cn/).
![Alt text](https://github.com/3033935295/DAT505-GitHub/blob/master/image/19.png)
### And the map's data is from this web(https://download.csdn.net/download/xujialei1234/10390066).
![Alt text](https://github.com/3033935295/DAT505-GitHub/blob/master/image/20.png)
### From china.json, some discrete point coordinates are extracted from the outline of the border lines of each province. On the top is the outline of the province drawn by the grid model, and the boundary between the provinces is drawn by the line model Line below.
![Alt text](https://github.com/3033935295/DAT505-GitHub/blob/master/image/21.png)
### First, it introduced a database of GDP, and set the height of the geometry to be higher when the data number is higher. Create a geometry at the same time, and then add a texture(texture2).
