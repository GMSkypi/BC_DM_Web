import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService, UserDetail } from './login/user.service';
import { Product, Pagable, ShredCode, ArchBox } from './main/search/searchResult/searchResult.component';
import { Slot } from './main/imputBars/crtDocFBar/crtDocFBar.component';
import { FolderLog } from './main/imputBars/logBar/logBar.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  sortCommonSuffix = '&sortDir=asc&sort=id';
  sortClientSuffix = '&sortDir=asc&sort=surname';

  baseUrl = 'http://localhost:8080'

  loginUrl = '/login'
  logoutUrl = '/logout'

  tryloginUrl = '/isauthorized'
  productFindUrl = '/product/productinfo/'
  freeSlotUrl = '/folder/findfreefolder/'
  createDocumentUrl ='/document/createdoc/'
  shredCodeUrl ='/arch/shredcodes/'
  getAllBoxesUrl = '/arch/allboxes/'
  createBoxUrl = '/arch/createBox/'
  deleteBoxUrl='/arch/deleteBox/'
  sendBoxUrl='/arch/sendbox/'
  inBoxUrl='/arch/inbox/'

  blockFolderUrl='/folderaction/blockfolder/'
  pickUpFolderUrl = '/folderaction/pickupfolder/'
  returnFolderUrl='/folderaction/returnfolder/'

  findOwnBlockedUrl = '/folderaction/findownblockeddoc/'
  findAllBlockedUrl = '/folderaction/findallblockeddoc/'

  findOwnPickUpUrl = '/folderaction/findownpickedupdoc/'
  findAllPickUpUrl = '/folderaction/findallpickedupdoc/'

  archiveDocumentUrl= '/document/archivedoc/'

  findFolderLogUrl= '/document/log/'


  constructor (private http : HttpClient) { }

  getUrl(url : String){
    return this.baseUrl + url
  }
  login(auth){
    return this.http.get<UserDetail>(this.getUrl(this.loginUrl),  { headers: { authorization: auth }, withCredentials:true,observe: 'response'})
  }
  logout(){
    return this.http.get(this.getUrl(this.logoutUrl),{withCredentials: true,observe: 'response'})
  }
  tryLogin(){
    return this.http.get<UserDetail>(this.getUrl(this.tryloginUrl),{withCredentials: true,observe: 'response'})
  }
  productFind(requestBody){
    return this.http.post<Pagable<Product>>(this.getUrl(this.productFindUrl) + '?page=0&size=10&sortDir=asc&sort=id',requestBody,{withCredentials: true,observe: 'response'} )
  }
  freeSlot(applCode : number){
    return this.http.get<Pagable<Slot>>(this.getUrl(this.freeSlotUrl) + '?applcode=' + applCode + '&page=0&size=10&sortDir=asc&sort=id',{withCredentials: true,observe: 'response'})
  }
  createDocumentWSlot(productId : number, documentNote: String, folderId : number, folderNote: String){
    return this.http.post<Product>(
      this.getUrl(this.createDocumentUrl) +
       "?productid=" + productId +
        "&note=" + documentNote +
         "&foldernumber=" + folderId +
          "&foldernote=" + folderNote,
          null,
          {withCredentials: true,observe: 'response'}
           )
  }
  createDocumentWArch(productId : number, documentNote: String, boxId : number){
    return this.http.post<Product>(
      this.getUrl(this.createDocumentUrl) +
       "?productid=" + productId +
        "&note=" + documentNote +
         "&boxid=" + boxId +
          null,
          {withCredentials: true,observe: 'response'}
           )
  }
  findAllshredCodes(){
    return this.http.get<Pagable<ShredCode>>(this.getUrl(this.shredCodeUrl) + "?page=0&size=10&sortDir=asc&sort=id",
    {withCredentials: true,observe: 'response'}
    )
  }
  findBoxes(closed : Boolean){
    return this.http.get<Pagable<ArchBox>>(this.getUrl(this.getAllBoxesUrl) + "?closed=" + closed + "&page=0&size=10&sortDir=asc&sort=id",
    {withCredentials: true,observe: 'response'}
    )
  }
  createBox(shredCodeId : String, note : String ){
    return this.http.post<ArchBox>(this.getUrl(this.createBoxUrl) + "?note=" + note + "&shredcode=" + shredCodeId,
    null,
    {withCredentials: true,observe: 'response'}
    )
  }
  deleteBox(boxId : number){
    return this.http.delete(this.getUrl(this.deleteBoxUrl) + boxId,{withCredentials: true,observe: 'response'})
  }
  sendBox(boxId : number){
    return this.http.patch<ArchBox>(this.getUrl(this.sendBoxUrl) + boxId,null,{withCredentials: true,observe: 'response'})
  }
  inBox(boxId : number){
    return this.http.get<Pagable<Product>>(this.getUrl(this.inBoxUrl) + "?boxId=" + boxId + "&page=0&size=10&sortDir=asc&sort=id",
    {withCredentials: true,observe: 'response'})
  }


  archiveDocument(folderIds : Array<number>, boxId : number, archNote : String){
    return this.http.patch<Product[]>(this.getUrl(this.archiveDocumentUrl) + "?boxid=" + boxId + "&archnode=" + archNote,
    folderIds,
    {withCredentials: true,observe: 'response'})
  }


  blocateFolder(folderIds : Array<number>, note : String, officer : String, room : String){
    return this.http.patch<Product[]>(this.getUrl(this.blockFolderUrl) + "?note=" + note + "&officer=" + officer + "&room=" + room,
    folderIds,
    {withCredentials: true,observe: 'response'})
  }
  pickUpFolder(folderIds : Array<number>, note : String){
    return this.http.patch<Product[]>(this.getUrl(this.pickUpFolderUrl) + "?note=" + note,
    folderIds,
    {withCredentials: true,observe: 'response'})
  }
  returnFolder(folderIds : Array<number>, note : String){
    return this.http.patch<Product[]>(this.getUrl(this.returnFolderUrl) + "?note=" + note,
    folderIds,
    {withCredentials: true,observe: 'response'})
  }

  findOwnBlocked(){
    return this.http.get<Pagable<Product>>(this.getUrl(this.findOwnBlockedUrl) + "?page=0&size=10&sortDir=asc&sort=id",{withCredentials: true,observe: 'response'})
  }
  findAllBlocked(){
    return this.http.get<Pagable<Product>>(this.getUrl(this.findAllBlockedUrl) + "?page=0&size=10&sortDir=asc&sort=id",{withCredentials: true,observe: 'response'})
  }
  findOwnPickUp(){
    return this.http.get<Pagable<Product>>(this.getUrl(this.findOwnPickUpUrl) + "?page=0&size=10&sortDir=asc&sort=id",{withCredentials: true,observe: 'response'})
  }
  findAllPickUp(){
    return this.http.get<Pagable<Product>>(this.getUrl(this.findAllPickUpUrl) + "?page=0&size=10&sortDir=asc&sort=id",{withCredentials: true,observe: 'response'})
  }
  findFolderLog(documentId : number){
    return this.http.get<Pagable<FolderLog>>(this.getUrl(this.findFolderLogUrl) + "?documentid="+documentId+"&page=0&size=10&sortDir=asc&sort=id",{withCredentials: true,observe: 'response'})
  }

}
