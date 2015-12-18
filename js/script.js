var editor, awsCloudConfigEditor;

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
});

var showIAASEditor = function () {
  editor = new JSONEditor(document.getElementById("iaas-editor"), IAASSchema);
};

var showAWSCloudConfigEditor = function () {
  awsCloudConfigEditor = new JSONEditor(document.getElementById("aws-cc-editor"), AWSCloudConfigSchema);
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
          "title": "Networks",
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
                "title": "Subnets",
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
                      "title": "DNS",

                      "items": {
                        "type": "string"
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
