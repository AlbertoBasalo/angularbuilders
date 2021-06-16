echo " generate contact page";
nx g library contact --importPath=@ab/contact --prefix=ab --routing --lazy --parentModule='apps\www\src\app\core\core-routing.module.ts' --tags='domain, page'
nx g c contact --project=domain-contact --flat --skipTests=false --skipSelector --type=Page
nx g c contact --project=domain-contact
nx g s contact --project=domain-contact --flat
git add *
git commit -m 'feat: generate contact page'
