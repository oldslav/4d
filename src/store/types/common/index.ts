// export interface Document {
//   docType: {
//     description: string,
//     id: number,
//     name: string
//   },
//   id: number,
//   imagePath: string
// }

interface DocType {
  description: string,
  id: number,
  name: string
}

export interface Document {
  lastModified: string,
  lastModifiedDate: Date,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string,
  imagePath: string,
  id: number,
  docType: DocType
}
