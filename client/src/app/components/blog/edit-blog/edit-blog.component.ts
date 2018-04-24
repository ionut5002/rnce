import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';



@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  blog;
  processing = false;
  currentUrl;
  loading = true;
  LocationMap;
   locations;
   allusers;
   emailList=[]

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
   
  ) { }

  // Function to Submit Update
  updateBlogSubmit() {
    this.newEmailNote()
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.blogService.editBlog(this.blog).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.getNewNotification();
          this.router.navigate(['/blog']); // Navigate back to route page
        }, 2000);
      }
    });
  }
  getNewNotification(){
    const notification = {
      title: this.blog.title, // Title field
      createdBy: this.blog.createdBy // CreatedBy field
    }
    
    this.blogService.newNotification(notification).subscribe(data => {
      // Check if blog was saved to database or not
      
    });
  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }
 


  /* email notification */



  getAllUsers() {
    // Function to GET all blogs from database
    this.blogService.getAllUsers().subscribe(data => {
      this.allusers = data.users; // Assign array to use in HTML
      this.getEmailList()
    });
  }
  
    getEmailList(){
      for(let i =0; i < this.allusers.length; i++){
        if(this.allusers[i].role === "TMP"){
        this.emailList.push(this.allusers[i].email)}
        }
        
    }
    newEmailNote(){
      
      const newEmail = {
        to: this.emailList.toString(), // Title field
        html:'<h2>New Edit on Job</h2><br /> '+ ' Title: <strong>' + this.blog.title +'</strong><br />' +'Job No: ' +'<strong>' + this.blog.JobNo+'</strong>'+'</strong><br />' +'By: ' +'<strong>' + this.blog.createdBy+'</strong>', // CreatedBy field
      }
      
      this.blogService.newEmailNot(newEmail).subscribe(data => {
        // Check if blog was saved to database or not
        
      });
    }

  ngOnInit() {
    this.getAllUsers()
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.blog = data.blog; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });

  }

}
