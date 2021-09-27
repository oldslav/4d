export const updateEntity = (
  entity: ICesiumEntity,
  cb: (entity: any) => void
): void => {
  const collection = entity.entityCollection;
  Promise.resolve().then(() => {
    collection.remove(entity);
    cb(entity);
    collection.add(entity);
  });
};
