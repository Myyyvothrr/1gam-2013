using UnityEngine;
using System.Collections;

public class jumper : MonoBehaviour
{
    public float force = 10;

    void Start()
    {
    }

    void Update()
    {
    }

    void OnTriggerEnter(Collider collider)
    {
        if (collider.tag.Equals("Player"))
        {
            collider.rigidbody.AddForce(Vector3.up * force, ForceMode.Impulse);
        }
    }
}
