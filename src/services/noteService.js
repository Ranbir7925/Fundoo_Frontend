import axiosService from './axiosService'
class NoteService{
    getAddNote(addNoteDetails){
        return axiosService.post('notes/addNotes',addNoteDetails)
    }
    fetchNotesList(){
        return axiosService.get('notes/getNotesList')
    }
}
export default new NoteService