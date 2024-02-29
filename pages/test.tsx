import Loading from "@/components/global/loading";
export default function Test() {
    return (
        <>
            <input   type="checkbox" className='mt-11 ml-10'
                onChange={(e) =>{
                    const el = e.target
                    el.checked = !el.checked
                }} 
            />
        </>
    );
}
