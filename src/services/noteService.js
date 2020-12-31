import axiosService from './axiosService'
class NoteService{
    getAddNote(addNoteDetails){
        return axiosService.post('notes/addNotes',addNoteDetails)
    }
    fetchNotesList(){
        return axiosService.get('notes/getNotesList')
    }
    DeletedNoteMoveToTrash(trashData){
        return axiosService.post('notes/trashNotes',trashData)
    }
    fetchTrashNotesList(){
        return axiosService.get('notes/getTrashNotesList')
    }
    deleteForever(noteId){
        return axiosService.post('notes/deleteForeverNotes',noteId)
    }
}
export default new NoteService