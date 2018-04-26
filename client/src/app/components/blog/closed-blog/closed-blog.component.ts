import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-closed-blog',
  templateUrl: './closed-blog.component.html',
  styleUrls: ['./closed-blog.component.css']
})
export class ClosedBlogComponent implements OnInit {

  message;
  messageClass;
  foundBlog = false;
  processing = false;
  blog;
  currentUrl;
  blogPosts;
  enabledComments = [];
  username;
  role;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private location:Location
  ) { }

  // Function to delete blogs
  closedBlog() {
    this.processing=true;
    // Function for DELETE request
    this.blogService.closeBlog(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/blog']); // Route users to blog page
        }, 2000);
      }
    });
  }

  getAllBlogs() {
    // Function to GET all blogs from database
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs; // Assign array to use in HTML
      
    });}
    expand(id) {
      this.enabledComments.push(id); // Add the current blog post id to array
    }
  
    // Collapse the list of comments
    collapse(id) {
      const index = this.enabledComments.indexOf(id); // Get position of id in array
      this.enabledComments.splice(index, 1); // Remove id from array
    }
    goBack() {
      this.location.back();
    }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.role= profile.user.role;
    });
    this.getAllBlogs();
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    if(this.currentUrl.id){
      this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data => {
        // Check if request was successfull
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Return bootstrap error class
          this.message = data.message; // Return error message
        } else {
          // Create the blog object to use in HTML
          this.blog = {
            title: data.blog.title, // Set title
            body: data.blog.body, // Set body
            createdBy: data.blog.createdBy, // Set created_by field
            createdAt: data.blog.createdAt,
            close: data.blog.close // Set created_at field
          }
          this.foundBlog = true; // Displaly blog window
        }
      });
    }
    
    
  }
}
