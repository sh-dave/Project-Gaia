// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  ProjectGaia.VoxelWorld = (function() {
    var Materials, Types, colorFromRGB;

    Types = ProjectGaia.BlockTypes;

    Materials = ProjectGaia.BlockMaterials;

    VoxelWorld.BlockMaterialMappings = [new ProjectGaia.BlockMaterialMapping([[Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty], [Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty], [Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty], [Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty], [Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty]]), new ProjectGaia.BlockMaterialMapping([[Materials.Rock, Materials.Rock, Materials.Gravel, Materials.Gravel, Materials.Sand], [Materials.Rock, Materials.Soil, Materials.Soil, Materials.Gravel, Materials.Sand], [Materials.Snow, Materials.Soil, Materials.Soil, Materials.Soil, Materials.Sand], [Materials.FrozenRock, Materials.Soil, Materials.Soil, Materials.Mud, Materials.Mud], [Materials.FrozenRock, Materials.Snow, Materials.Mud, Materials.Mud, Materials.Mud]]), new ProjectGaia.BlockMaterialMapping([[Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty, Materials.Empty], [Materials.Ice, Materials.Water, Materials.Water, Materials.Water, Materials.Steam], [Materials.Ice, Materials.Water, Materials.Water, Materials.Water, Materials.Steam], [Materials.Ice, Materials.Water, Materials.Swamp, Materials.Swamp, Materials.Steam], [Materials.Ice, Materials.Water, Materials.Swamp, Materials.Swamp, Materials.Steam]])];

    colorFromRGB = function(r, g, b) {
      return new THREE.Color(r / 255, g / 255, b / 255);
    };

    VoxelWorld.BlockMaterialProperties = [];

    VoxelWorld.BlockMaterialProperties[Materials.Rock] = {
      blockType: Types.Earth,
      color: colorFromRGB(78, 78, 86)
    };

    VoxelWorld.BlockMaterialProperties[Materials.FrozenRock] = {
      blockType: Types.Earth,
      color: colorFromRGB(130, 173, 179)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Soil] = {
      blockType: Types.Earth,
      color: colorFromRGB(157, 107, 80)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Snow] = {
      blockType: Types.Earth,
      color: colorFromRGB(242, 238, 204)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Gravel] = {
      blockType: Types.Earth,
      color: colorFromRGB(122, 113, 89)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Sand] = {
      blockType: Types.Earth,
      color: colorFromRGB(231, 210, 130)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Mud] = {
      blockType: Types.Earth,
      color: colorFromRGB(108, 74, 74)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Ice] = {
      blockType: Types.Water,
      color: colorFromRGB(188, 212, 223)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Water] = {
      blockType: Types.Water,
      color: colorFromRGB(59, 128, 149)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Swamp] = {
      blockType: Types.Water,
      color: colorFromRGB(75, 89, 61)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Steam] = {
      blockType: Types.Water,
      color: colorFromRGB(228, 216, 202)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Unknown1] = {
      blockType: Types.Earth,
      color: colorFromRGB(160, 128, 66)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Unknown2] = {
      blockType: Types.Earth,
      color: colorFromRGB(103, 108, 26)
    };

    VoxelWorld.BlockMaterialProperties[Materials.Unknown3] = {
      blockType: Types.Earth,
      color: colorFromRGB(89, 65, 38)
    };

    VoxelWorld.getMaterialIndexForColor = function(colorOrR, g, b) {
      var color;
      if (colorOrR instanceof THREE.Color) {
        color = colorOrR;
      } else {
        color = colorFromRGB(r, g, b);
      }
      return _.findIndex(this.BlockMaterialProperties, (function(_this) {
        return function(blockMaterialProperties) {
          return blockMaterialProperties.color.equals(color);
        };
      })(this));
    };

    function VoxelWorld(options) {
      var blockMaterial, blockProperties, blockType, blocksInformationArray, dataHeight, dataWidth, i, index, j, k, ref, ref1, ref2, x, y, z;
      this.options = options;
      dataWidth = 512;
      dataHeight = 512;
      blocksInformationArray = new Uint8Array(dataWidth * dataHeight * 4);
      blocksInformationArray.fill(255);
      for (z = i = 0, ref = this.options.depth; 0 <= ref ? i < ref : i > ref; z = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = this.options.height; 0 <= ref1 ? j < ref1 : j > ref1; y = 0 <= ref1 ? ++j : --j) {
          for (x = k = 0, ref2 = this.options.width; 0 <= ref2 ? k < ref2 : k > ref2; x = 0 <= ref2 ? ++k : --k) {
            index = this.getBlockIndexForCoordinates(x, y, z) * 4;
            blockType = Math.floor(Math.random() * 3);
            blockMaterial = Math.max(0, Math.floor(Math.random() * 1014 - 1000));
            blockProperties = {
              temperature: Math.floor(Math.random() * 5),
              humidity: Math.floor(Math.random() * 5)
            };
            blocksInformationArray[index] = blockType;
            blocksInformationArray[index + 1] = blockProperties.temperature;
            blocksInformationArray[index + 2] = blockProperties.humidity;
            blocksInformationArray[index + 3] = blockMaterial;
            blocksInformationArray[index] = blockMaterial * 10;
          }
        }
      }
      this.startingBlocksInformationTexture = new THREE.DataTexture(blocksInformationArray, dataWidth, dataHeight, THREE.RGBAFormat);
    }

    VoxelWorld.prototype.getBlockIndexForCoordinates = function(x, y, z) {
      return x + y * this.options.width + z * this.options.width * this.options.height;
    };

    return VoxelWorld;

  })();

}).call(this);

//# sourceMappingURL=voxelworld.js.map