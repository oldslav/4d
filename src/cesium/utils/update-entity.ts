export const updateEntity = (
  entity: any,
  cb: (entity: any) => void
) => {
  const collection = entity.entityCollection;
  Promise.resolve().then(() => {
    collection.remove(entity);
    cb(entity);
    collection.add(entity);
  });
};
