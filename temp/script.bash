echo " generate about page";
nx g library about --importPath=@ab/about --prefix=ab --routing --lazy --parentModule='apps\www\src\app\core\core-routing.module.ts' --tags='domain, page'
nx g c about --project=domain-about --flat --skipTests=false --skipSelector --type=Page
nx g c about --project=domain-about
nx g s about --project=domain-about --flat
git add *
git commit -m 'feat: generate about page'
