export default function formaterNameDash(name){
  return name.replace('dashboard_', '').split('_').join(' ')
}