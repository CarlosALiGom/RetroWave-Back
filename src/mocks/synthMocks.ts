export interface SynthsStructure {
  name: string;
  brand: string;
  imageUrl: string;
  description: string;
  yearOfCreation: string;
  type: string;
  user: string;
}

export const synthsMock: SynthsStructure[] = [
  {
    name: "tb 303",
    brand: "Roland",
    imageUrl: "Roland tb 303 image",
    description: "Analog bassline machine",
    yearOfCreation: "1983",
    type: "analog",
    user: "AZapllmhqdOZZjBSEqD82QEzMoyRK",
  },
  {
    name: "tr 808",
    brand: "Roland",
    imageUrl: "Roland tr 808 image",
    description: "Analog drum machine",
    yearOfCreation: "1980",
    type: "analog",
    user: "AZapllmhqdOZZjBSEqD82QEzMoyRK",
  },
];

export const synthMock: SynthsStructure[] = [
  {
    name: "tr 808",
    brand: "Roland",
    imageUrl: "Roland tr 808 image",
    description: "Analog drum machine",
    yearOfCreation: "1980",
    type: "analog",
    user: "AZapllmhqdOZZjBSEqD82QEzMoyRK",
  },
];
