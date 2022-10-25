type PickerParam = {
    accept: string;
    multiple: boolean;
}

export const FORMAT_ALL="*"

export const FORMAT_IMAGE="image/*"

export const FORMAT_IMAGE_SUPPORTED="image/png,image/jpeg,image/gif,image/webp"

export const showFilePicker = ({ accept, multiple }: PickerParam = { accept: FORMAT_ALL, multiple: false }) => {
    const picker=document.createElement('input');
    picker.type='file';
    picker.accept=accept;
    picker.multiple=multiple;
    // picker.style.display='none'
    // picker.style.position='absolute'
    // document.body.appendChild(picker)
    return new Promise<File[]>((res,rej)=>{
        picker.addEventListener('change',()=>{
            console.log(picker.files)
            res(Array.from(picker.files))
            // document.body.removeChild(picker)
        })
        picker.addEventListener('error',rej)
        picker.click()
    })
 }