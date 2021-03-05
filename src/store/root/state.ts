export interface IRootState {
  isMobile: boolean
}

function state (): IRootState {
  return {
    isMobile: false
  }
}

export default state
