var editor, awsCloudConfigEditor, deploymentManifestEditor;

$().ready( function() {
  JSONEditor.defaults.options.theme = 'bootstrap3';


  $("#get-started").click(function() {
    $("#index-banner").hide();
    $("#iaas").show();
    showIAASEditor();
  });

  $("#iaas-next").click(function () {
    var data = editor.getValue();

    if (data.IAAS === 'AWS') {
      $('#iaas').hide();
      $('#aws-cloud-config').show();
      showAWSCloudConfigEditor();
    }
  });

  $("#aws-cloud-config-next").click(function () {

    $('#aws-cloud-config').hide();
    $('#deployment-manifest').show();

    showDeploymentManifestEditor();
  });

});

var showIAASEditor = function () {
  editor = new JSONEditor(document.getElementById("iaas-editor"), IAASSchema);
};

var showAWSCloudConfigEditor = function () {
  awsCloudConfigEditor = new JSONEditor(document.getElementById("aws-cc-editor"), AWSCloudConfigSchema);
};

var showDeploymentManifestEditor = function () {
  deploymentManifestEditor = new JSONEditor(document.getElementById("deployment-manifest-editor"), DeploymentManifestSchema);
};

var IAASSchema = {
  "schema": {
    "title": "IAAS",
    "type": "object",
    "properties": {
        "IAAS": {
          "type": "string",
          "enum": ["AWS"]
        }
    }
  }
}

var AWSCloudConfigSchema = {
  "schema": {
    "title": "Cloud Config",
    "type": "object",
    "properties": {
        "compilation": {
          "type": "object",
          "options": {
            "collapsed": true
          },
          "properties": {
            "az": {
              "type": "string"
            },
            "network": {
              "type": "string"
            },
            "reuse_compilation_vms": {
              "type": "boolean",
              "format": "checkbox"
            },
            "workers": {
              "type": "integer"
            },
            "cloud_properties": {
              "type": "object",
              "properties": {
                "ephemeral_disk": {
                  "type": "object",
                  "properties": {
                    "size": {
                      "type": "integer"
                    },
                    "type": {
                      "type": "string",
                      "enum": ["gp2", "io1", "standard"],
                      "default": "gp2"
                    }
                  }
                },
                "instance_type": {
                  "type": "string",
                }
              }
            }
          }
        },
        "disk_pools": {
          "type": "array",
          "options": {
            "collapsed": true
          },
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "Disk Pool",
            "properties": {
              "cloud_properties": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["gp2", "io1", "standard"],
                    "default": "gp2"
                  }
                }
              },
              "disk_size": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              }
            }
          }
        },
        "azs": {
          "type": "array",
          "options": {
            "collapsed": true
          },
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "Availability Zone",
            "properties": {
              "name": {
                "type": "string"
              },
              "cloud_properties": {
                "type": "object",
                "properties": {
                  "availability_zone": {
                    "type": "string",
                    "enum": ["us-east-1a","us-east-1b","us-east-1c","us-east-1d","us-west-1a","us-west-2a"]
                  }
                }
              }
            }
          }
        },
        "networks": {
          "type": "array",
          "options": {
            "collapsed": true
          },
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "Network",
            "properties": {
              "name": {
                "type": "string"
              },

              "subnets": {
                "type": "array",
                "uniqueItems": true,

                "items": {
                  "type": "object",
                  "title": "Subnet",
                  "uniqueItems": true,

                  "properties": {
                    "cloud_properties": {
                      "type": "object",
                      "properties": {
                        "subnet": {
                          "type": "string"
                        }
                      }
                    },
                    "dns": {
                      "type": "array",

                      "items": {
                        "type": "string",
                        "title": "DNS"
                      }
                    },
                    "gateway": {
                      "type": "string"
                    },
                    "range": {
                      "type": "string"
                    },
                    "reserved": {
                      "type": "string"
                    },
                    "az": {
                      "type": "string"
                    }
                  }
                }
              },
              "type": {
                "type": "string"
              }
            }
          }
        },
        "vm_types": {
          "type": "array",
          "options": {
            "collapsed": true
          },
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "VM Type",
            "properties": {
              "name": {
                "type": "string"
              },
              "cloud_properties": {
                "type": "object",
                "properties": {
                  "instance_type": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  var DeploymentManifestSchema = {
    "schema": {
      "title": "Deployment-manifest",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the deployment"
        },
        "director_uuid": {
          "type": "string",
          "description": "UUID"
        },
        "releases": {
          "type": "array",
          "format": "table",
          "title": "Releases",
          "description": "Write a fancy description here",
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "Release",
            "properties": {
              "name": {
                "type": "string"
              },
              "version": {
                "type": "string"
              },
              "url": {
                "type": "string"
              },
              "sha1": {
                "type": "string"
              }
            }
          }
        },
        "stemcells": {
          "type": "array",
          "format": "table",
          "title": "Stemcells",
          "description": "Write a fancy description here for stemcells",
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "Stemcel",
            "properties": {
              "alias": {
                "type": "string"
              },
              "os": {
                "type": "string"
              },
              "version": {
                "type": "string"
              }
            }
          }
        },
        "update": {
          "type": "object",
          "title": "Update",
          "properties": {
            "canaries": {
              "type": "integer"
            },
            "canary_watch_time": {
              "type": "string"
            },
            "max_in_flight": {
              "type": "integer"
            },
            "update_watch_time": {
              "type": "string"
            },
            "serial": {
              "type": "boolean",
              "format": "checkbox",
              "default": false
            }
          }
        },

        "meta": {
          "type": "object",
          "title": "Meta",
          "properties": {
            "environment": {
              "type": "string"
            },
            "syslog_aggregator": {
              "type": "string"
            }
          }
        },

        "jobs": {
          "type": "array",
          "title": "Jobs",
          "description": "Write a fancy description here",
          "uniqueItems": true,
          "items": {
            "type": "object",
            "title": "Job",
            "properties": {
              "name": {
                "type": "string"
              },
              "instances": {
                "type": "integer"
              },
              "stemcell": {
                "type": "string"
              },
              "persistent_disk_pool": {
                "type": "string"
              },
              "release": {
                "type": "string"
              },
              "networks": {
                "type": "array",
                "title": "Networks",
                "description": "add afancy description",
                "items": {
                  "type": "object",
                  "title": "Network",
                  "properties": {
                    "name": {
                      "type": "string"
                    }
                  }
                }
              },
              "azs": {
                "type": "array",
                "title": "azs",
                "items": {
                  "type": "string",
                  "title": "az"
                }
              },
              "templates": {
                "type": "array",
                "title": "Tempaltes",
                "description": "add afancy description",
                "items": {
                  "type": "object",
                  "title": "Template",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "release": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }