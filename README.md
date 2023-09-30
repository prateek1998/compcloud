# CompCloud: Image Optimization and S3 Upload

![CompCloud Logo](https://example.com/compcloud-logo.png)

CompCloud is a simple and efficient solution for optimizing your images and seamlessly uploading them to an Amazon S3 bucket. This open-source project simplifies the process of image optimization, reducing file sizes while maintaining quality, and automates the task of transferring these optimized images to your S3 storage. Whether you're a developer looking to streamline image handling for your web application or a content creator seeking an easy way to optimize and store images in the cloud, CompCloud has you covered.

## Features

- Image optimization: Reduce image file sizes without compromising quality.
- Drag 'n' Drop Image Upload feature.
- Suppports mulitple Image file formats like .jpeg, *.jpg, *.png, *.gif.
- Convert image in multiple formats like *.webp, *.jpg, *.png.
- Amazon S3 integration: Automatically upload optimized images to your S3 bucket.
- Automatic clean your images from local after 1 hour of your upload. 
- Cross-platform: Compatible with Windows, macOS, and Linux.
- Customizable settings: Fine-tune optimization options to meet your specific needs.
- Github action support through which you can easily upload repo in your EC2 Server.
- Open-source: Free to use, modify, and contribute to.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14 or higher) installed on your machine.
- An Amazon Web Services (AWS) account with access to an S3 bucket.

### Installation

To install CompCloud, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/prateek1998/compcloud.git
   cd compcloud
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

#### Optional

Within the project directory you'll find a *.env.local* file just rename it as *.env*, and fill the necessary details.

  ```bash
 AWS_ACCESS_KEY_ID = ID
AWS_SECRET_ACCESS_KEY = ACCESS_KEY
S3_REGION = REGION_NAME
S3_BUCKET = BUCKET_NAME
File_Path = /path/to/images/

   ```

### Technologies

- [NextJs](https://Nextjs.org/)
- [Sharp](https://sharp.pixelplumbing.com/install/)
- [AWS S3](https://aws.amazon.com/s3/)
- [TailwindCss](https://tailwindcss.com/docs/installation)

### Usage

1. For Development Environment:

   ```bash
   npm run dev
   ```

2. For Production Environment:

   ```bash
   npm run start
   ```

## Screen Shots


## Contributing

We welcome contributions from the open-source community! If you'd like to contribute to CompCloud, please read our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the open-source community for their contributions and support.

---

Happy image optimization and S3 uploading with CompCloud! If you encounter any issues or have suggestions for improvements, please [submit an issue](https://github.com/prateek1998/compcloud/issues).

**Disclaimer**: This project is not affiliated with or endorsed by Amazon Web Services (AWS) or any other third-party service mentioned.