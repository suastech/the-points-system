export default function validateUrl(dataObject) {
  if (
      (dataObject.gap < 0 || dataObject.gap > 3 )
      || (dataObject.sex1 !== 0 && dataObject.sex1 !== 1)
      || (dataObject.sex2 !== 0 && dataObject.sex2 !== 1)
      || (dataObject.winner !== 1 && dataObject.winner !== 2)
      || (dataObject.status === null)
      || (dataObject.date[4] !== "-" || dataObject.date[7] !== "-" )
  )
  return false
  else return true
}