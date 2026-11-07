{ pkgs, ... }:

{
  cachix.enable = false;

  packages = with pkgs; [
    git
  ];

  # devenv has no native git config option, so set repo-local config on shell entry
  enterShell = ''
    git config --local user.name "the-fire-next-time"
    git config --local user.email "stockhausen.serves.imperialism@proton.me"
    git config --local pull.rebase true
  '';

  # https://devenv.sh/languages/
  languages.javascript.enable = true;
  languages.typescript.enable = true;
  languages.javascript.pnpm.enable = true;
}
