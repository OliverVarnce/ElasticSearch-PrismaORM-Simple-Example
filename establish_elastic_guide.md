1. Create account or SignIn in https://www.elastic.co.
2. Rename env.example to .env
3. Create deployment.
   ![](blob/1.png)
4. Copy credentials and download credentials file.
   ![](blob/2.png)
5. Paste password to ELASTIC_PASS= in .env.
6. Wait while elastic nod will be created, then push 'Continue'
   ![](blob/3.png)
7. Add integration:
   ![](blob/4.png)
8. Select Enterprise search:
   ![](blob/5.png)
9. Create an elastic index:
   ![](blob/6.png)
10. Enter name of index and create it:
   ![](blob/7.png)
11. Create API key:
   ![](blob/8.png)
   ![](blob/9.png)
12. Download it:
   ![](blob/10.png)
13. Go to link 'Elastic search'(1) and copy Cloud ID (2)
   ![](blob/11.png)
14. Paste this Cloud ID to ELASTIC_CLOUD_ID in .env
15. Your Elastic configuration is ready.
