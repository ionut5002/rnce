import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http ,RequestOptions, Headers} from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  
  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  form;
  commentForm;
  processing = false;
  username;
  role;
  blogPosts;
  newComment = [];
  enabledComments = [];
  listing;  
  filesToUpload=[];
   upl = [];
   options;
   Notifications;
   blogT;
   co=0;
   location;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService,
    private http: Http
  ) {

    this.createNewBlogForm(); // Create new blog form on start up
    this.createCommentForm(); // Create form for posting comments on a user's blog post
  }

  // Function to create new blog form
  createNewBlogForm() {
    this.form = this.formBuilder.group({
      // Title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      JobNo: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        this.NumericValidation2
      ])],
      // Body field
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])],
      path: [],
      Client: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
        this.alphaNumericValidation
      ])],
      StartDate : [],
      SpeedOfRoad: [],
      RoadWidth: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(1),
        this.NumericValidation
      ])],
      CarriagewayType: [],
      RoadLevel: [],
      Volume : ['',Validators.compose([
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(1),
        this.NumericValidation
      ])],
      WorksType : [],
      WorksHours : [],
      LocationOnRoad : [],
      TypeOfTrafficCR : [],
    })
  }

  // Create form for posting comments
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])],
      attachements: []
      
    })
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }

  // Enable new blog form
  enableFormNewBlogForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable();
    this.form.get('JobNo').enable();
    this.form.get('Client').enable();
    this.form.get('StartDate').enable();
    this.form.get('SpeedOfRoad').enable();
    this.form.get('RoadWidth').enable();
    this.form.get('CarriagewayType').enable();
    this.form.get('RoadLevel').enable();
    this.form.get('Volume').enable();
    this.form.get('WorksType').enable();
    this.form.get('WorksHours').enable();
    this.form.get('LocationOnRoad').enable();
    this.form.get('TypeOfTrafficCR').enable();
    
  }

  // Disable new blog form
  disableFormNewBlogForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable();
    this.form.get('JobNo').disable();
    this.form.get('Client').disable();
    this.form.get('StartDate').disable();
    this.form.get('SpeedOfRoad').disable();
    this.form.get('RoadWidth').disable();
    this.form.get('CarriagewayType').disable();
    this.form.get('RoadLevel').disable();
    this.form.get('Volume').disable();
    this.form.get('WorksType').disable();
    this.form.get('WorksHours').disable();
    this.form.get('LocationOnRoad').disable();
    this.form.get('TypeOfTrafficCR').disable(); // Disable body field
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true } // Return error in validation
    }
  }
  NumericValidation(controls) {
    const regExp = new RegExp(/^\d*\.?\d*$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'NumericValidation': true } // Return error in validation
    }
  }
  NumericValidation2(controls) {
    const regExp = new RegExp(/^[0-9]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'NumericValidation2': true } // Return error in validation
    }
  }

  // Function to display new blog form
  newBlogForm() {
    this.newPost = true; // Show new blog form
  }

  // Reload blogs on current page
  reloadBlogs() {
    this.loadingBlogs = true; // Used to lock button
    this.getAllBlogs();
    this.getAllNotifications(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingBlogs = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to post a new comment on blog post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
    this.blogService.getSingleBlog(id).subscribe(data =>{
      this.blogT = data.blog.title;
      
   });
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the blog post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
    this.processing = false; // Enable any buttons that were locked
  }

  // Function to submit a new blog post
  onBlogSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewBlogForm(); // Lock form

    // Create blog object from form fields
    const blog = {
      title: this.form.get('title').value,
      JobNo: this.form.get('JobNo').value, // Title field
      body: this.form.get('body').value,
      Client:this.form.get('Client').value,
      StartDate:this.form.get('StartDate').value,
      SpeedOfRoad:this.form.get('SpeedOfRoad').value,
      RoadWidth:this.form.get('RoadWidth').value,
      CarriagewayType:this.form.get('CarriagewayType').value,
      RoadLevel:this.form.get('RoadLevel').value,
      Volume:this.form.get('Volume').value,
      WorksType:this.form.get('WorksType').value,
      WorksHours:this.form.get('WorksHours').value,
      LocationOnRoad:this.form.get('LocationOnRoad').value,
      TypeOfTrafficCR:this.form.get('TypeOfTrafficCR').value,
      path:this.upl,
      createdBy: this.username // CreatedBy field
    }

    // Function to save blog into database
    this.blogService.newBlog(blog).subscribe(data => {
      // Check if blog was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewBlogForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        this.getNewNotification();
        this.getAllBlogs();
        this.getAllNotifications();

        

        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewBlogForm(); // Enable the form fields
        }, 2000);
      }
    });
  }

  getNewNotification(){
    const notification = {
      title: this.form.get('title').value, // Title field
      createdBy: this.username // CreatedBy field
    }
    this.blogService.newNotification(notification).subscribe(data => {
      // Check if blog was saved to database or not
      
    });
  }
/*   getNewNotificationComment(){
  
  } */
  seenNotification(id){
    this.blogService.seenNotification(id).subscribe(data =>{
      this.getAllNotifications();
    })
  }
  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // Function to get all blogs from the database
  getAllBlogs() {
    // Function to GET all blogs from database
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs; // Assign array to use in HTML
    });
  }
  getAllNotifications() {
    // Function to GET all blogs from database
    this.blogService.getAllNotifications().subscribe(data => {
      this.Notifications = data.notifications;
      this.co=0;
      for(var i=0; i < this.Notifications.length; i++) {
        if(!this.Notifications[i].seen.includes(this.username) && !this.Notifications[i].author.includes(this.username)){
          
            this.co++;
            
          
          
        }
      }

      
    
    });
  }
  

  // Function to like a blog post
  likeBlog(id) {
    // Service to like a blog post
    this.blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs after like
    });
  }

  // Function to disliked a blog post
  dislikeBlog(id) {
    // Service to dislike a blog post
    this.blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs(); // Refresh blogs after dislike
    });
  }

  // Function to post a new comment
  postComment(id) {
    
    const notification = {
      title: this.blogT, // Title field
      createdBy: this.username // CreatedBy field
    }
    
    this.blogService.newNotification(notification).subscribe(data => {
      // Check if blog was saved to database or not
    });
    this.upload();
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    const attachements=this.upl;
    
    // Function to save the comment to the database
    this.blogService.postComment(id, comment, attachements).subscribe(data => {
      this.getAllBlogs(); // Refresh all blogs to reflect the new comment
      const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset();// Reset the comment form
      this.processing = false; // Unlock buttons on comment form
      if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current blog post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        //'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }
  
  
  upload() {
  
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
  
      for(let i =0; i < files.length; i++){
          formData.append("uploads[]", files[i], files[i]['name']);
      }
      this.createAuthenticationHeaders();
      return this.http.post(this.authService.domain +'blogs/uploads', formData,  this.options )
          .map(files => files).subscribe()}

 
fileChangeEvent(fileInput: any) {
  this.filesToUpload = <Array<File>>fileInput.target.files;
this.upl=[];
  for(let i =0; i < this.filesToUpload.length; i++){
this.upl.push(this.filesToUpload[i]['name'])
  }
}
reloadAuto(){
  setInterval(()=>{
    this.getAllBlogs();
    this.getAllNotifications(); },300000); 
  }

  

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.role= profile.user.role; // Used when creating new blog posts and comments
      
    });
    this.reloadAuto();
    this.getAllBlogs(); // Get all blogs on component load
    this.getAllNotifications();


    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        console.log(position.coords.latitude + ', ' +position.coords.longitude);
        console.log(position.coords.longitude); 
      });
   }
  }


}
