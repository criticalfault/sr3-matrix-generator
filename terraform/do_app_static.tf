resource "digitalocean_app" "matrix-gen" {
  spec {
    name   = "matrix-generator"
    region = "nyc"
    domain {
      name = "matrix.nullsheen.com"
      type = "PRIMARY"
    }

    static_site {
      name          = "matrix-generator-sr3"
      build_command = "npm run build"
      output_dir    = "/build"

      git {
        repo_clone_url = "https://github.com/criticalfault/sr3-matrix-generator.git"
        branch         = "main"
      }
    }
  }
}