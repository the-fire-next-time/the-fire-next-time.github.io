{ pkgs, ... }:

{
  cachix.enable = false;

  packages = with pkgs; [
    git
  ];

  # https://devenv.sh/languages/
  languages.javascript.enable = true;
  languages.typescript.enable = true;
  languages.javascript.pnpm.enable = true;
}
